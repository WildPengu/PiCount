import { CryptoSparkline } from '../CryptoSparkLine';
import { CirculatingSupply } from './circulatingSupply/CirculatingSupply';
import styles from './CryptoRow.module.scss';
import { PercentageChange } from './percentageChange/PercentageChange';

type RowProps = {
  index: number;
  row: Cryptocurrency;
};

export const CryptoRow: React.FC<RowProps> = ({ index, row }) => {
  const {
    image,
    name,
    symbol,
    current_price,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    price_change_percentage_30d_in_currency,
    circulating_supply,
    market_cap,
    max_supply,
    sparkline_in_7d,
  } = row;

  return (
    <div className={styles.assetRow}>
      <div>{index + 1}</div>

      <div className={styles.nameColumn}>
        <img src={image} className={styles.image} />
        <div className={styles.column}>
          <div className={styles.upperItem}>{name}</div>
          <div className={styles.lowerItem}>{symbol.toUpperCase()}</div>
        </div>
      </div>

      <div className={`${styles.price} ${styles.alignRight}`}>${current_price.toFixed(2)}</div>

      <div className={styles.alignRight}>
        <PercentageChange value={price_change_percentage_1h_in_currency} />
      </div>
      <div className={styles.alignRight}>
        <PercentageChange value={price_change_percentage_24h_in_currency} />
      </div>
      <div className={styles.alignRight}>
        <PercentageChange value={price_change_percentage_7d_in_currency} />
      </div>
      <div className={styles.alignRight}>
        <PercentageChange value={price_change_percentage_30d_in_currency} />
      </div>

      <div className={`${styles.alignRight} ${styles.circulatingSupply}`}>
        <CirculatingSupply
          circulatingSupply={circulating_supply}
          maxSupply={max_supply}
          symbol={symbol}
        />
      </div>

      <div className={styles.alignRight}>${market_cap.toLocaleString('en-US')}</div>

      <CryptoSparkline
        prices={sparkline_in_7d.price}
        priceChangePercentage={price_change_percentage_7d_in_currency}
      />
    </div>
  );
};
