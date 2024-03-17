import { Crypto } from '../MyAssets';
import styles from './assetRow.module.scss';

export const AssetRow: React.FC<Crypto> = ({ name, symbol, amount, logo, quote }) => {
  const { price, percent_change_24h } = quote.USD;

  const currentValue = amount * price;
  const price_before_24h = price / (1 + (percent_change_24h / 100));

  const profitInDollars = currentValue - (amount * price_before_24h);

  return (
    <div className={styles.assetRow}>
      <div className={styles.firstColumn}>
        <img src={logo} className={styles.image} />
        <div className={styles.column}>
          <div className={styles.upperItem}>{symbol}</div>
          <div className={styles.lowerItem}>{name}</div>
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.upperItem}>{amount.toFixed(2)}</div>
        <div className={styles.lowerItem}>${(amount * price).toFixed(2)}</div>
      </div>

      <div className={styles.price}>${price.toFixed(2)}</div>
      <div
        className={styles.todaysPnL}
        style={{ color: profitInDollars > 0 ? '#0fac6f' : '#EF454A' }}
      >${profitInDollars.toFixed(2)}</div>
    </div>
  )
}