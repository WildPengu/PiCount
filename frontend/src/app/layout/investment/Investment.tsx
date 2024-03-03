import { useTranslation } from "react-i18next";
import styles from "./Investment.module.scss";
import { TopPanel } from "../../components/topPanel/TopPanel";
import { SetStateAction, useState } from "react";
import {
  faBitcoinSign,
  faEuroSign,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Color } from "../../types/Enums";
import { Loader } from "../../components/loader/Loader";
import { CryptoChart } from "../../components/investment/crypto/CryptoChart";
import { GoldChart } from "../../components/investment/gold/GoldChart";
import { CurrencyChart } from "../../components/investment/currency/CurrencyChart";

export const Investment = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [selectedInvestView, setSelectedInvestView] = useState("crypto");

  const handleChartButtonClick = (investType: SetStateAction<string>) => {
    setSelectedInvestView(investType);
  };

  return (
    <div className={styles.Investment}>
      <TopPanel headerText={t("invest.investment")}>
        <div className={styles.TopPanelContainer}>
          <Button
            backgroundColor={Color.transparent}
            onClick={() => handleChartButtonClick("crypto")}
          >
            <FontAwesomeIcon icon={faBitcoinSign} />
          </Button>
          <Button
            backgroundColor={Color.transparent}
            onClick={() => handleChartButtonClick("gold")}
          >
            <FontAwesomeIcon icon={faCoins} />
          </Button>
          <Button
            backgroundColor={Color.transparent}
            onClick={() => handleChartButtonClick("currency")}
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
            {selectedInvestView === "crypto" && <CryptoChart setLoading={setLoading} />}
            {selectedInvestView === "gold" && <GoldChart setLoading={setLoading} />}
            {selectedInvestView === "currency" && <CurrencyChart setLoading={setLoading} />}
          </div>
        </div>
      )}
    </div>
  );
};
