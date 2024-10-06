import {
  faBitcoinSign,
  faCoins,
  faEuroSign,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/button/Button';
import { Crypto } from '../../components/investment/crypto/Crypto';
import { CurrencyChart } from '../../components/investment/currency/CurrencyChart';
import { GoldChart } from '../../components/investment/gold/GoldChart';
import { Loader } from '../../components/loader/Loader';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { Color } from '../../types/Enums';
import styles from './Investment.module.scss';

export const Investment = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [selectedInvestView, setSelectedInvestView] = useState('crypto');

  const handleChartButtonClick = (investType: SetStateAction<string>) => {
    setSelectedInvestView(investType);
  };

  return (
    <div className={styles.Investment}>
      <TopPanel headerText={t('invest.investment')}>
        <div className={styles.TopPanelContainer}>
          <Button
            backgroundColor={Color.transparent}
            onClick={() => handleChartButtonClick('crypto')}
          >
            <FontAwesomeIcon icon={faBitcoinSign} />
          </Button>
          <Button
            backgroundColor={Color.transparent}
            onClick={() => handleChartButtonClick('gold')}
          >
            <FontAwesomeIcon icon={faCoins} />
          </Button>
          <Button
            backgroundColor={Color.transparent}
            onClick={() => handleChartButtonClick('currency')}
          >
            <FontAwesomeIcon icon={faEuroSign} />
          </Button>
        </div>
      </TopPanel>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.InvestmentContainer}>
          <div className={styles.InvestComponentContainer}>
            {selectedInvestView === 'crypto' && (
              <Crypto setLoading={setLoading} />
            )}
            {selectedInvestView === 'gold' && (
              <GoldChart setLoading={setLoading} />
            )}
            {selectedInvestView === 'currency' && (
              <CurrencyChart setLoading={setLoading} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
