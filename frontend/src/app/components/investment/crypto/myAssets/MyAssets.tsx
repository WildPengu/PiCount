import _ from "lodash";
import { useEffect, useState } from "react";
import { AppSettingsProvider } from "../../../../config";
import { Loader } from "../../../loader/Loader";
import styles from './MyAssets.module.scss';
import { AssetRow } from './assetRow/AssetRow';

export interface Crypto {
  name: string;
  symbol: string;
  amount: number;
  logo: string;
  quote: any;
}

export const MyAssets = () => {
  const { appSettings } = AppSettingsProvider();
  const [crypto, setCrypto] = useState<Crypto>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}`
        );

        setCrypto(await response.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const cryptoRows = _.map(crypto as any, (row: Crypto, index: number) => {
    return (
      <AssetRow
        key={index}
        name={row.name}
        symbol={row.symbol}
        amount={row.amount}
        logo={row.logo}
        quote={row.quote}
      />
    );
  });

  return (
    <div className={styles.assetsContainer}>
      <div className={styles.sortHeader}>
        <div>Coin</div>
        <div>Amount</div>
        <div>Coin Price</div>
        <div>Today's PnL</div>
      </div>
      <div className={styles.assetsList}>
        {crypto ? cryptoRows : <Loader />}
      </div>
    </div>
  );
};
