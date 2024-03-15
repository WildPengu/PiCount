import { useEffect } from "react";
import { AppSettingsProvider } from "../../../../config";
import styles from './MyAssets.module.scss';
import { AssetRow } from './assetRow/assetRow';

interface InvestProps {
  setLoading: (loading: boolean) => void;
}

export const MyAssets: React.FC<InvestProps> = ({ setLoading }) => {
  const { appSettings } = AppSettingsProvider();

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(
    //       `${appSettings.apiHost}:${appSettings.apiPort}/cryptocurrency/latest?limit=15`
    //     );

    //     console.log(await response.json());
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchData();
  }, []);

  return (
    <div className={styles.assetsContainer}>
      <div className={styles.sortHeader}>
        <div>Coin</div>
        <div>Amount</div>
        <div>Coin Price</div>
        <div>Today's PnL</div>
      </div>
      <div className={styles.assetsList}>
        {<AssetRow />}
        {<AssetRow />}
        {<AssetRow />}
        {<AssetRow />}
        {<AssetRow />}
        {<AssetRow />}
        {<AssetRow />}
        {<AssetRow />}
        {<AssetRow />}
        {<AssetRow />}
        {<AssetRow />}
        {<AssetRow />}
      </div>
    </div>
  );
};
