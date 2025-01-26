
import { useEffect, useState } from 'react';
import { AppSettingsProvider } from '../../../../config';
import { Loader } from '../../../loader/Loader';
import styles from './AllCrypto.module.scss';
import { CryptoRow } from './cryptoRow/CryptoRow';

export const AllCrypto = () => {
  const { appSettings } = AppSettingsProvider();
  const [allCrypto, setAllCrypto] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${appSettings.apiHost}:${appSettings.apiPort}/cryptocurrency/latest?limit=50`,
      );
      const result = await response.json();
      if (result.error) {
        setAllCrypto(null);
      } else {
        setAllCrypto(result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setAllCrypto(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [appSettings.apiHost, appSettings.apiPort, appSettings.user_id]);

  const cryptoRows = allCrypto?.map((row: Cryptocurrency, index: number) => {
    return (
      <div key={`${row.id}-${index}`}>
        <CryptoRow
          index={index}
          row={row}
        />
      </div>
    );
  });

  return (
    <div className={styles.assetsContainer}>
      <div className={styles.sortHeader}>
        <div>#</div>
        <div>Name</div>
        <div className={styles.alignRight}>Price</div>
        <div className={styles.alignRight}>1h %</div>
        <div className={styles.alignRight}>24h %</div>
        <div className={styles.alignRight}>7d %</div>
        <div className={styles.alignRight}>30d %</div>
        <div className={styles.alignRight}>Circulating Supply</div>
        <div className={styles.alignRight}>Market Cap</div>
        <div className={styles.alignRight}>Last 7 days</div>
      </div>
      <div className={styles.assetsList}>
        {allCrypto ? cryptoRows : <Loader />}
      </div>
    </div>
  )
}