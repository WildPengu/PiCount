import _ from 'lodash';
import { useEffect, useState } from 'react';
import { AppSettingsProvider } from '../../../../config';
import { Loader } from '../../../loader/Loader';
import styles from './MyAssets.module.scss';
import { AssetRow } from './assetRow/AssetRow';

export interface Crypto {
  cryptoId: string;
  name: string;
  symbol: string;
  amount: number;
  logo: string;
  quote: any;
}

export const MyAssets = () => {
  const { appSettings } = AppSettingsProvider();
  const [crypto, setCrypto] = useState<Crypto>();
  const [inputAmount, setInputAmount] = useState<number>();
  const [inputSymbol, setInputSymbol] = useState<string>();
  const [assetsPrice, setAssetsPrice] = useState<number>(0);

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
  }, []);

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
    } catch (error: any) {
      console.error('Error deleting crypto asset:', error.message);
    }
  }

  const addCrypto = (symbol: string, amount: number) => {
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
  ) => {
    const url = `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}/${cryptoId}?amount=${amount}`;

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
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  let totalAssetsPrice = 0;

  const cryptoRows = _.map(
    crypto as Record<string, any>,
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
        <button onClick={() => addCrypto(inputSymbol, inputAmount)}>Add</button>
      </div>
    </div>
  );
};
