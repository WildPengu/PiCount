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
    price,
    percent_change_1h,
    percent_change_24h,
    percent_change_7d,
    percent_change_30d,
    circulating_supply,
    marketCap,
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

      <div className={`${styles.price} ${styles.alignRight}`}>${price.toFixed(2)}</div>

      <div className={styles.alignRight}>
        <PercentageChange value={percent_change_1h} />
      </div>
      <div className={styles.alignRight}>
        <PercentageChange value={percent_change_24h} />
      </div>
      <div className={styles.alignRight}>
        <PercentageChange value={percent_change_7d} />
      </div>
      <div className={styles.alignRight}>
        <PercentageChange value={percent_change_30d} />
      </div>

      <div className={`${styles.alignRight} ${styles.circulatingSupply}`}>
        <CirculatingSupply
          circulatingSupply={circulating_supply}
          maxSupply={max_supply}
          symbol={symbol}
        />
      </div>

      <div className={styles.alignRight}>${marketCap.toLocaleString('en-US')}</div>

      <CryptoSparkline
        prices={sparkline_in_7d.price}
        priceChangePercentage={percent_change_7d}
      />
    </div>
  );
};
