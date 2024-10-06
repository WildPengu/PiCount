import express from 'express';
import request from 'request';

const router = express.Router();
const key = '55a866d8-fc5f-479b-8206-15fa987e95f0';

router.get('/latest', (req, res) => {
  const limit = req.query.limit || 10;
  const options = {
    url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${limit}&convert=USD`,
    headers: {
      'X-CMC_PRO_API_KEY': key,
    },
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
    }
  });
});

router.get('/quote', (req, res) => {
  const crypto = req.query.crypto;
  const options = {
    url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}`,
    headers: {
      'X-CMC_PRO_API_KEY': key,
    },
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
    }
  });
});

export default router;
