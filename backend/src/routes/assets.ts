import express, { Request, Response } from 'express';
import request from 'request';
import { Asset, UserAssets } from '../models/assets';
const mongoose = require('mongoose');

const router = express.Router();

interface Crypto {
  name: string;
  symbol: string;
  amount: number;
  logo: string;
  quote: any;
}

const key = '4cd90ce2-58d6-4c3a-8250-f4c2bb444ad3';

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
    let numProcessed = 0;

    for (const [cryptoId, asset] of cryptoAssets.entries()) {
      const { symbol, amount } = asset;
      const options = {
        url: `http://localhost:3000/cryptocurrency/quote?crypto=${symbol}`,
        headers: {
          'X-CMC_PRO_API_KEY': key,
        },
      };

      request(options, (error, response, body) => {
        if (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          const { name, quote } = JSON.parse(body).data[symbol];

          request(
            `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?CMC_PRO_API_KEY=${key}&symbol=${symbol}`,
            (logoError, logoResponse, logoBody) => {
              if (logoError) {
                console.error('Error fetching logo data:', logoError);
                res.status(500).json({ error: 'Internal Server Error' });
              } else {
                const logo = JSON.parse(logoBody).data[symbol]['0'].logo;
                cryptoQuotes[symbol] = { name, symbol, amount, logo, quote };

                numProcessed++;

                if (numProcessed === cryptoAssets.size) {
                  res.json(cryptoQuotes);
                }
              }
            }
          );
        }
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
