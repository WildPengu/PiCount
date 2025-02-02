import express, { Request, Response } from 'express';
import { Asset, UserAssets } from '../models/assets';
import { mapCryptoData, sortCryptoData } from './utils';
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

router.get('/crypto/:id', async (req, res) => {
	const userId = req.params.id;
	const { sortBy, sortOrder = 'asc' } = req.query;

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

		let cryptoQuotes = Array.from(cryptoAssets.values())
			.map((asset) => {
				const cryptoData = data.find(
					(item: any) =>
						item.id.toLowerCase() ===
						asset.cryptoId.toLowerCase(),
				);
				return cryptoData
					? mapCryptoData(asset, cryptoData)
					: null;
			})
			.filter(Boolean);

		if (sortBy) {
			cryptoQuotes = sortCryptoData(
				cryptoQuotes,
				sortBy,
				sortOrder,
			);
		}

		res.json({ success: true, data: cryptoQuotes });
	} catch (error) {
		console.error(
			'Error fetching sorted crypto data:',
			error,
		);
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
		});
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
		const { cryptoId, amount } = req.body;
		try {
			const userAssets = await UserAssets.findOne({
				userId,
			});

			if (!userAssets) {
				return res.status(404).json({
					success: false,
					message: 'User assets not found',
				});
			}

			let existingAsset = Array.from(
				userAssets.assets.crypto.values(),
			).find(
				(asset) =>
					asset.cryptoId.toLowerCase() ===
					cryptoId.toLowerCase(),
			);

			if (existingAsset) {
				existingAsset.amount += amount;
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

			for (const asset of cryptoAssets.values()) {
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
