import express, { Request, Response } from 'express';
import { Asset, UserAssets } from '../models/assets';
const axios = require('axios');
const mongoose = require('mongoose');

const router = express.Router();

interface Crypto {
  cryptoId: string;
  name: string;
  symbol: string;
  amount: number;
  logo: string;
  quote: Quote;
}

interface QuoteData {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: number | null;
  last_updated: string;
}

interface Quote {
  USD: QuoteData;
}

const COINGECKO_API_BASE =
	'https://api.coingecko.com/api/v3';

async function fetchCryptoData(ids: string): Promise<any> {
	const url = `${COINGECKO_API_BASE}/coins/markets`;
	const response = await axios.get(url, {
		params: {
			ids,
			vs_currency: 'usd',
			order: 'market_cap_desc',
			price_change_percentage: '1h,24h,7d,30d',
			sparkline: true,
		},
		headers: {
			accept: 'application/json',
			'x-cg-demo-api-key': 'CG-Yx8sgE7pUefGoxUBDAzZE6Cz	',
		},
	});
	return response.data;
}

function mapCryptoData(asset: any, symbolData: any) {
	return {
		id: asset.id,
		cryptoId: asset.cryptoId,
		amount: asset.amount,
		symbol: symbolData.symbol,
		name: symbolData.name,
		image: symbolData.image,
		price: symbolData.current_price,
		marketCap: symbolData.market_cap,
		volume24h: symbolData.total_volume,
		change24h: symbolData.price_change_percentage_24h,
		lastUpdated: symbolData.last_updated,
		percent_change_1h:
			symbolData.price_change_percentage_1h_in_currency,
		percent_change_24h:
			symbolData.price_change_percentage_24h_in_currency,
		percent_change_7d:
			symbolData.price_change_percentage_7d_in_currency,
		percent_change_30d:
			symbolData.price_change_percentage_30d_in_currency,
		circulating_supply: symbolData.circulating_supply,
		max_supply: symbolData.max_supply,
		sparkline_in_7d: symbolData.sparkline_in_7d,
	};
}

router.get('/crypto/:id', async (req, res) => {
	const userId = req.params.id;

	try {
		const userAssets = await UserAssets.findOne({ userId });

		if (!userAssets) {
			return res.status(404).json({
				success: false,
				message: 'User assets not found',
			});
		}

		const cryptoAssets = userAssets.assets.crypto;
		const ids = Array.from(cryptoAssets.values())
			.map((asset) => asset.cryptoId.toLowerCase())
			.join(',');

		const data = await fetchCryptoData(ids);

		const cryptoQuotes: any[] = [];
		const errors: string[] = [];

		for (const [id, asset] of cryptoAssets.entries()) {
			const cryptoData = data.find(
				(item: any) =>
					item.id.toLowerCase() ===
					asset.cryptoId.toLowerCase(),
			);

			if (cryptoData) {
				cryptoQuotes.push(mapCryptoData(asset, cryptoData));
			} else {
				errors.push(`Data for ${asset.cryptoId} not found`);
			}
		}

		res.json({ success: true, data: cryptoQuotes, errors });
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error
				? error.message
				: 'Unknown error';
		res
			.status(500)
			.json({ success: false, message: errorMessage });
	}
});

router.delete('/crypto/:id/:cryptoId', async (req, res) => {
	const cryptoId = req.params.cryptoId;
	const userId = req.params.id;

	try {
		const userAssets = await UserAssets.findOne({
			userId: userId,
		});

		if (!userAssets) {
			return res.status(404).json({
				success: false,
				message: 'User assets not found',
			});
		}

		const cryptoAssets = userAssets.assets.crypto;

		if (cryptoAssets.has(cryptoId)) {
			cryptoAssets.delete(cryptoId);
		}

		await userAssets.save();

		const ids = Array.from(cryptoAssets.values())
			.map((asset) => asset.cryptoId.toLowerCase())
			.join(',');

		const data = await fetchCryptoData(ids);

		const cryptoQuotes: any[] = [];
		const errors: string[] = [];

		for (const [id, asset] of cryptoAssets.entries()) {
			const symbolData = data.find(
				(item: any) =>
					item.id.toLowerCase() ===
					asset.cryptoId.toLowerCase(),
			);

			if (symbolData) {
				cryptoQuotes.push(mapCryptoData(asset, symbolData));
			} else {
				errors.push(`Data for ${asset.cryptoId} not found`);
			}
		}

		res.json({ success: true, data: cryptoQuotes, errors });
	} catch (error) {
		console.error('Error deleting crypto asset:', error);
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
		});
	}
});

router.patch(
	'/crypto/:id',
	async (req: Request, res: Response) => {
		const userId = req.params.id;
		const { assetId, amount, cryptoId } = req.body;
		try {
			const userAssets = await UserAssets.findOne({
				userId: userId,
			});

			if (!userAssets) {
				return res.status(404).json({
					success: false,
					message: 'User assets not found',
				});
			}

			const existingAsset =
				userAssets.assets.crypto.get(assetId);

			if (existingAsset) {
				existingAsset.amount = amount;
			} else {
				const newAsset: Asset = {
					id: new mongoose.Types.ObjectId(),
					cryptoId,
					amount,
				};
				userAssets.assets.crypto.set(cryptoId, newAsset);
			}

			await userAssets.save();

			const cryptoAssets = userAssets.assets.crypto;
			const ids = Array.from(cryptoAssets.values())
				.map((asset) => asset.cryptoId.toLowerCase())
				.join(',');

			const data = await fetchCryptoData(ids);

			const cryptoQuotes: any[] = [];
			const errors: string[] = [];

			for (const [id, asset] of cryptoAssets.entries()) {
				const cryptoData = data.find(
					(item: any) =>
						item.id.toLowerCase() ===
						asset.cryptoId.toLowerCase(),
				);

				if (cryptoData) {
					cryptoQuotes.push(
						mapCryptoData(asset, cryptoData),
					);
				} else {
					errors.push(
						`Data for ${asset.cryptoId} not found`,
					);
				}
			}

			res.json({
				success: true,
				data: cryptoQuotes,
				errors,
			});
		} catch (error: any) {
			res
				.status(500)
				.json({ success: false, message: error.message });
		}
	},
);




export default router;
