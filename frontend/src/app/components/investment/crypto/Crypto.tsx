import { useState } from 'react';
import { AllCrypto } from './allCrypto/AllCrypto';
import styles from './Crypto.module.scss';
import { MyAssets } from './myAssets/MyAssets';

interface InvestProps {
  setLoading: (loading: boolean) => void;
}

enum ActiveView {
  AllCrypto = 'chart',
  MyAssets = 'myAssets',
}

export const Crypto: React.FC<InvestProps> = () => {
  const [activeView, setActiveView] = useState(ActiveView.AllCrypto);

  return (
    <div>
      <div className={styles.cryptoHeader}>
        <h2
          className={styles.cryptoHeaderText}
          onClick={() => {
            setActiveView(ActiveView.AllCrypto);
          }}
        >
          All Crypto
        </h2>
        <h2
          className={styles.cryptoHeaderText}
          onClick={() => {
            setActiveView(ActiveView.MyAssets);
          }}
        >
          My Assets
        </h2>
      </div>
      {activeView === ActiveView.AllCrypto && <AllCrypto />}
      {activeView === ActiveView.MyAssets && <MyAssets />}
    </div>
  );
};
