import _ from 'lodash';
import { useEffect, useState } from 'react';
import { AppSettingsProvider } from '../../../../config';
import Button from '../../../button/Button';
import { Loader } from '../../../loader/Loader';
import styles from './MyAssets.module.scss';
import { AssetRow } from './assetRow/AssetRow';

export interface Crypto {
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


export const MyAssets = () => {
  const { appSettings } = AppSettingsProvider();
  const [crypto, setCrypto] = useState<Record<string, Crypto>>({});
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [inputSymbol, setInputSymbol] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}`,
        );

        setCrypto(await response.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [appSettings.apiHost, appSettings.apiPort, appSettings.user_id]);

  async function deleteCryptoAsset(cryptoId: string, symbol: string) {
    try {
      const response = await fetch(
        `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}/${cryptoId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete crypto asset');
      }

      const updateCrypto = { ...crypto };
      delete updateCrypto[symbol];
      setCrypto(updateCrypto);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting crypto asset:', error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  }

  const addCrypto = (symbol: string, amount: number) => {
    if (!symbol || !amount) {
      return;
    }

    fetch(
      `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol,
          amount,
        }),
      },
    ).catch((error) => {
      console.error('An error occured', error);
    });
  };

  const updateCryptoAmount = (
    amount: number,
    cryptoId: string,
    symbol: string,
  ): Promise<void> => {
    const url = `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}/${cryptoId}?amount=${amount}`;

    return new Promise<void>((resolve, reject) => {
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((updatedCrypto) => {
          const allCrypto = { ...crypto };
          allCrypto[symbol].amount = updatedCrypto.amount;
          setCrypto(allCrypto);
          resolve();
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
          reject(error);
        });
    });
  };

  let totalAssetsPrice = 0;

  const cryptoRows = _.map(
    crypto as Record<string, Crypto>,
    (row: Crypto, index: number) => {
      if (row.quote && row.quote.USD && row.quote.USD.price) {
        const cryptoValue = parseFloat(
          (row.amount * row.quote.USD.price).toFixed(2),
        );
        totalAssetsPrice += cryptoValue;

        return (
          <AssetRow
            key={index}
            row={row}
            deleteCryptoAsset={deleteCryptoAsset}
            updateCryptoAmount={updateCryptoAmount}
          />
        );
      }
    },
  );

  return (
    <div className={styles.assetsContainer}>
      <h2>Portfolio value: {totalAssetsPrice.toLocaleString('en-US')}$</h2>
      <div className={styles.sortHeader}>
        <div>Coin</div>
        <div>Amount</div>
        <div>Coin Price</div>
        <div>Today's PnL</div>
        <div>24h %</div>
        <div>7d %</div>
        <div>30d %</div>
      </div>
      <div className={styles.assetsList}>
        {crypto ? cryptoRows : <Loader />}
      </div>
      <div>
        <div>
          <span>Amount:</span>
          <input
            name="amount"
            type="number"
            min={0.000001}
            step={0.01}
            value={inputAmount}
            onChange={(e) => setInputAmount(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <span>Symbol:</span>
          <input
            name="symbol"
            type="string"
            value={inputSymbol}
            onChange={(e) => setInputSymbol(e.target.value)}
          />
        </div>
        <Button onClick={() => addCrypto(inputSymbol, inputAmount)}>Add</Button>
      </div>
    </div>
  );
};
