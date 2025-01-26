import { useEffect, useState } from 'react';
import { AppSettingsProvider } from '../../../../config';
import Button from '../../../button/Button';
import { Loader } from '../../../loader/Loader';
import styles from './MyAssets.module.scss';
import { AssetRow } from './assetRow/AssetRow';

export interface Crypto {
  id: string;
  cryptoId: string;
  name: string;
  symbol: string;
  amount: number;
  image: string;
  price: number;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  percent_change_30d: string;
  sparkline_in_7d: {
    price: number[];
  };
}


export const MyAssets = () => {
  const { appSettings } = AppSettingsProvider();
  const [crypto, setCrypto] = useState<Crypto[]>([]);
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [inputCryptoId, setInputCryptoId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}`,
        );
        const result = await response.json()
        console.log('111', result.data)
        setCrypto(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [appSettings.apiHost, appSettings.apiPort, appSettings.user_id]);

  async function deleteCryptoAsset(cryptoId: string, index: number) {
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

      const updateCrypto = [...crypto];
      delete updateCrypto[index];
      setCrypto(updateCrypto);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting crypto asset:', error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  }

  const addCrypto = async (id: string, amount: number, cryptoId: string) => {
    if (!id || !amount || !cryptoId) {
      return;
    }

    try {
      const response = await fetch(
        `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            assetId: id,
            amount,
            cryptoId,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to add crypto asset');
      }

      const updatedCrypto = await response.json();

      setCrypto(updatedCrypto.data);
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const updateCryptoAmount = async (
    amount: number,
    id: string,
    cryptoId: string,
  ): Promise<void> => {
    try {
      const response = await fetch(
        `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            assetId: id,
            amount,
            cryptoId
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update crypto amount');
      }

      const updatedCrypto = await response.json();
      console.log(updatedCrypto)
      setCrypto(updatedCrypto.data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  let totalAssetsPrice = 0;

  const cryptoRows = crypto?.map((row: Crypto, index: number) => {
    const cryptoValue = row.amount * row.price;
    totalAssetsPrice += cryptoValue;

    return (
      <AssetRow
        index={index}
        row={row}
        deleteCryptoAsset={deleteCryptoAsset}
        updateCryptoAmount={updateCryptoAmount}
      />
    );
  });


  return (
    <div className={styles.assetsContainer}>
      <h2>Portfolio value: {totalAssetsPrice.toLocaleString('en-US')}$</h2>
      <div className={styles.sortHeader}>
        <div>#</div>
        <div>Name</div>
        <div className={styles.alignRight}>Holdings</div>
        <div className={styles.alignRight}>Price</div>
        <div className={styles.alignRight}>Today's PnL</div>
        <div className={styles.alignRight}>1h %</div>
        <div className={styles.alignRight}>24h %</div>
        <div className={styles.alignRight}>7d %</div>
        <div className={styles.alignRight}>30d %</div>
        <div className={styles.alignRight}>Last 7 days</div>
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
          <span>Crypto:</span>
          <input
            name="symbol"
            type="string"
            value={inputCryptoId}
            onChange={(e) => setInputCryptoId(e.target.value)}
          />
        </div>
        <Button onClick={() => addCrypto(inputCryptoId, inputAmount)}>Add</Button>
      </div>
    </div>
  );
};
