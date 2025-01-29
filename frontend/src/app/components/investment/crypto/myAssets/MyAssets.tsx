import { useEffect, useState } from 'react';
import { AppSettingsProvider } from '../../../../config';
import Button from '../../../button/Button';
import { Loader } from '../../../loader/Loader';
import { Modal } from '../../../modal/Modal';
import styles from './MyAssets.module.scss';
import { AddCryptoModal } from './addCryptoModal/AddCryptoModal';
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
  const [toggleModal, setToggleModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}`,
        );
        const result = await response.json()
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

  const addCrypto = async (amount: number, cryptoId: string) => {
    if (!amount || !cryptoId) {
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

  let totalAssetsPrice = 0;

  const cryptoRows = crypto?.map((row: Crypto, index: number) => {
    const cryptoValue = row.amount * row.price;
    totalAssetsPrice += cryptoValue;

    return (
      <AssetRow
        index={index}
        row={row}
        deleteCryptoAsset={deleteCryptoAsset}
      />
    );
  });


  return (
    <div className={styles.assetsContainer}>
      <div className={styles.chartBoxHeader}>
        <h2>Portfolio value: {totalAssetsPrice.toLocaleString('en-US')}$</h2>
        <Button onClick={() => { setToggleModal(!toggleModal) }}>+ Add Crypto</Button>
      </div>

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

      {toggleModal && <Modal>
        {<AddCryptoModal setToggleModal={setToggleModal} addCrypto={addCrypto} />}
      </Modal>}
    </div>
  );
};
