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

const key = '55a866d8-fc5f-479b-8206-15fa987e95f0';

// Update assets
router.patch('/crypto/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const userAssets = await UserAssets.findOne({ userId: userId });

    if (!userAssets) {
      return res.status(404).json({ message: 'User assets not found' });
    }

    const newAsset: Asset = {
      id: new mongoose.Types.ObjectId(),
      symbol: req.body.symbol,
      amount: req.body.amount,
    };

    userAssets.assets.crypto.set(newAsset.id, newAsset);
    await userAssets.save();

    res.json(userAssets.assets.crypto);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/crypto/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const userAssets = await UserAssets.findOne({ userId: userId });

    if (!userAssets) {
      return res.status(404).json({ message: 'User assets not found' });
    }

    const cryptoAssets = userAssets.assets.crypto;
    const cryptoQuotes: Record<string, Crypto> = {};
    const errors: string[] = [];

    for (const [cryptoId, asset] of cryptoAssets.entries()) {
      const { symbol, amount } = asset;
      const quoteUrl = `http://localhost:3000/cryptocurrency/quote?crypto=${symbol}`;
      const infoUrl = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?CMC_PRO_API_KEY=${key}&symbol=${symbol}`;

      try {
        const quoteResponse = await axios.get(quoteUrl);
        const symbolData = quoteResponse.data.data[symbol];

        if (!symbolData) {
          throw new Error(`Symbol not found in response: ${symbol}`);
        }

        const { name, quote } = symbolData;
        const logoResponse = await axios.get(infoUrl);
        const logoData = logoResponse.data.data[symbol]?.['0'];

        if (!logoData) {
          throw new Error(`Logo not found for symbol: ${symbol}`);
        }

        const logo = logoData.logo;
        cryptoQuotes[symbol] = { cryptoId, name, symbol, amount, logo, quote };
      } catch (error: any) {
        console.error(
          `Error fetching data for ${symbol}:`,
          error.message || error
        );
        errors.push(`Failed to fetch data for ${symbol}: ${error.message}`);
      }
    }

    if (Object.keys(cryptoQuotes).length > 0) {
      res.json({ success: true, data: cryptoQuotes, errors });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch data for all symbols',
        errors,
      });
    }
  } catch (error: any) {
    console.error('Error processing request:', error.message || error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
});


router.delete('/crypto/:id/:cryptoId', async (req, res) => {
  const cryptoId = req.params.cryptoId;
  const userId = req.params.id;

  try {
    const userAssets = await UserAssets.findOne({ userId: userId });

    if (!userAssets) {
      return res.status(404).json({ message: 'User assets not found' });
    }

    const cryptoAssets = userAssets.assets.crypto;
    if (cryptoAssets.has(cryptoId)) {
      cryptoAssets.delete(cryptoId);
    }

    await userAssets.save();

    res.json({ message: `Crypto asset with ID ${cryptoId} has been deleted` });
  } catch (error) {
    console.error('Error deleting crypto asset:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.patch('/crypto/:id/:cryptoId', async (req: Request, res: Response) => {
  const userId = req.params.id;
  const cryptoId = req.params.cryptoId;

  try {
    const userAssets = await UserAssets.findOne({ userId: userId });
    if (!userAssets) {
      return res.status(404).json({ message: 'User assets not found' });
    }

    const cryptoToUpdate = userAssets.assets.crypto.get(cryptoId);

    if (!cryptoToUpdate) {
      return res.status(404).json({ message: 'Crypto asset not found' });
    }

    cryptoToUpdate.amount = req.body.amount;

    await userAssets.save();

    res.json(cryptoToUpdate);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
