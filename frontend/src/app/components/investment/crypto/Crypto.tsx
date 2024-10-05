import { useState } from 'react';
import styles from './Crypto.module.scss';
import { MyAssets } from './myAssets/MyAssets';

interface InvestProps {
  setLoading: (loading: boolean) => void;
}

enum ActiveView {
  Chart = 'chart',
  MyAssets = 'myAssets',
}

export const Crypto: React.FC<InvestProps> = () => {
  //const { appSettings } = AppSettingsProvider();
  const [activeView, setActiveView] = useState(ActiveView.MyAssets);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${appSettings.apiHost}:${appSettings.apiPort}/cryptocurrency/latest?limit=15`
  //       );

  //       console.log(await response.json());
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <div className={styles.cryptoHeader}>
        <h2
          className={styles.cryptoHeaderText}
          onClick={() => {
            setActiveView(ActiveView.MyAssets);
          }}
        >
          My Assets
        </h2>
        <h2
          className={styles.cryptoHeaderText}
          onClick={() => {
            setActiveView(ActiveView.Chart);
          }}
        >
          All Crypto
        </h2>
      </div>
      {activeView === ActiveView.MyAssets && <MyAssets />}
      {activeView === ActiveView.Chart && <div>hik</div>}
    </div>
  );
};
