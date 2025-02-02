import { useEffect, useState } from 'react';
import { AppSettingsProvider } from '../../../../config';
import { Loader } from '../../../loader/Loader';
import styles from './AllCrypto.module.scss';
import { CryptoRow } from './cryptoRow/CryptoRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export const AllCrypto = () => {
  const { appSettings } = AppSettingsProvider();
  const [allCrypto, setAllCrypto] = useState<any>(null);
  const [sortBy, setSortBy] = useState<string>('market_cap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${appSettings.apiHost}:${appSettings.apiPort}/cryptocurrency/latest?limit=50&sortBy=${sortBy}&sortOrder=${sortOrder}`,
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
  }, [sortOrder, sortBy]);

  const getArrow = (order: string, field: string): any => {
    if (field !== sortBy) return;
    if (order === 'desc') {
      return <FontAwesomeIcon icon={faCaretDown} />;
    }
    return <FontAwesomeIcon icon={faCaretUp} />;
  };

  const cryptoRows = allCrypto?.map((row: Cryptocurrency, index: number) => {
    return (
      <div key={`${row.id}-${index}`}>
        <CryptoRow index={index} row={row} />
      </div>
    );
  });

  return (
    <div className={styles.assetsContainer}>
      <div className={styles.sortHeader}>
        <div>#</div>
        <div onClick={() => handleSort('name')}>
          {getArrow(sortOrder, 'name')}
          Name
        </div>
        <div className={styles.alignRight} onClick={() => handleSort('price')}>
          {getArrow(sortOrder, 'price')}
          Price
        </div>
        <div
          className={styles.alignRight}
          onClick={() => handleSort('percent_change_1h')}
        >
          {getArrow(sortOrder, 'percent_change_1h')}
          1h %
        </div>
        <div
          className={styles.alignRight}
          onClick={() => handleSort('percent_change_24h')}
        >
          {getArrow(sortOrder, 'percent_change_24h')}
          24h %
        </div>
        <div
          className={styles.alignRight}
          onClick={() => handleSort('percent_change_7d')}
        >
          {getArrow(sortOrder, 'percent_change_7d')}
          7d %
        </div>
        <div
          className={styles.alignRight}
          onClick={() => handleSort('percent_change_30d')}
        >
          {getArrow(sortOrder, 'percent_change_30d')}
          30d %
        </div>
        <div
          className={styles.alignRight}
          onClick={() => handleSort('circulating_supply')}
        >
          {getArrow(sortOrder, 'circulating_supply')}
          Circulating Supply
        </div>
        <div
          className={styles.alignRight}
          onClick={() => handleSort('marketCap')}
        >
          {getArrow(sortOrder, 'marketCap')}
          Market Cap
        </div>
        <div className={styles.alignRight}>Last 7 days</div>
      </div>
      <div className={styles.assetsList}>
        {allCrypto ? cryptoRows : <Loader />}
      </div>
    </div>
  );
};
