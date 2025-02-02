import _ from 'lodash';
import { useEffect, useState } from 'react';
import { AppSettingsProvider } from '../../../../config';
import { Loader } from '../../../loader/Loader';
import styles from './AllCrypto.module.scss';
import { CryptoRow } from './cryptoRow/CryptoRow';
import { TooltipIcon } from '../../../tooltip/TooltipIcon';

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
  const cryptoRows = _.map(
    allCrypto as any,
    (row: Cryptocurrency, index: number) => {
      return (
        <div key={`${row.id}-${index}`}>
          <CryptoRow index={index} row={row} />
        </div>
      );
    },
  );

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
        <div className={styles.alignRight}>
          Circulating Supply
          <TooltipIcon
            text={`The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.`}
            link={
              'https://support.coinmarketcap.com/hc/en-us/articles/360043396252-Supply-Circulating-Total-Max'
            }
          />
        </div>
        <div className={styles.alignRight}>
          Market Cap
          <TooltipIcon
            text={`The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market. 
              \n\nMarket Cap = Current Price x Circulating Supply.`}
            link={
              'https://support.coinmarketcap.com/hc/en-us/articles/360043836811-Market-Capitalization-Cryptoasset-Aggregate'
            }
          />
        </div>
        <div className={styles.alignRight}>Last 7 days</div>
      </div>
      <div className={styles.assetsList}>
        {allCrypto ? cryptoRows : <Loader />}
      </div>
    </div>
  );
};
