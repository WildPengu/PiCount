import axios from 'axios';
import express from 'express';
import { mapCryptoData, sortCryptoData } from './utils';

const router = express.Router();

const COINGECKO_API_BASE =
	'https://api.coingecko.com/api/v3';

router.get('/latest', async (req, res) => {
	const limit = req.query.limit || 10;
	const { sortBy, sortOrder = 'asc' } = req.query;

	try {
		const response = await axios.get(
			`${COINGECKO_API_BASE}/coins/markets`,
			{
				params: {
					vs_currency: 'usd',
					order: 'market_cap_desc',
					price_change_percentage: '1h,24h,7d,30d',
					per_page: limit,
					page: 1,
					sparkline: true,
				},
			},
		);

		let modifiedData = response.data.map((coin: any) =>
			mapCryptoData(
				{ id: coin.id, cryptoId: coin.id },
				coin,
			),
		);

		if (sortBy) {
			modifiedData = sortCryptoData(
				modifiedData,
				sortBy,
				sortOrder,
			);
		}

		res.json(modifiedData);
	} catch (error: any) {
		console.error('Error fetching data:', error.message);
		res
			.status(500)
			.json({ error: 'Internal Server Error' });
	}
});

router.get('/quote', async (req, res) => {
  const crypto = req.query.crypto;

  if (!crypto) {
    return res.status(400).json({ error: 'Missing "crypto" query parameter' });
  }

  try {
    const response = await axios.get(`${COINGECKO_API_BASE}/coins/${crypto}`, {
      params: {
        localization: false,
      },
    });

    const data = response.data;
    res.json({
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      current_price: data.market_data.current_price.usd,
      price_change_percentage_1h:
        data.market_data.price_change_percentage_1h_in_currency?.usd,
      price_change_percentage_24h:
        data.market_data.price_change_percentage_24h_in_currency?.usd,
      price_change_percentage_7d:
        data.market_data.price_change_percentage_7d_in_currency?.usd,
      market_cap: data.market_data.market_cap.usd,
      total_volume: data.market_data.total_volume.usd,
      circulating_supply: data.market_data.circulating_supply,
      logo: data.image?.thumb,
    });
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
