
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { AppSettingsProvider } from '../../../../config';
import { Loader } from '../../../loader/Loader';
import { CryptoRow } from './cryptoRow/CryptoRow';
import styles from './MyAssets.module.scss';

export const AllCrypto = () => {
  const { appSettings } = AppSettingsProvider();
  const [allCrypto, setAllCrypto] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${appSettings.apiHost}:${appSettings.apiPort}/cryptocurrency/latest?limit=50`,
      );
      const result = await response.json();
      setAllCrypto(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [appSettings.apiHost, appSettings.apiPort, appSettings.user_id]);

  const cryptoRows = _.map(
    allCrypto as any,
    (row: Cryptocurrency, index: number) => {
      return (
        <CryptoRow
          key={index}
          row={row}
        />
      );

    },
  );

  return (
    <div className={styles.assetsContainer}>
      <div className={styles.sortHeader}>
        <div>Name</div>
        <div>Price</div>
        <div>1h %</div>
        <div>24h %</div>
        <div>7d %</div>
        <div>Market Cap</div>
        <div>Volume(24h)</div>
      </div>
      <div className={styles.assetsList}>
        {allCrypto ? cryptoRows : <Loader />}
      </div>
    </div>
  )
}