import styles from './CryptoRow.module.scss';

export const CryptoRow = ({ key, row }) => {
  const { logo, name, symbol, cryptoId, quote } = row;
  const { price, percent_change_24h, percent_change_7d, percent_change_30d } =
    quote.USD;

  const price_before_24h = price / (1 + percent_change_24h / 100);

  // nie wiem co to
  const amount = 1;
  const profitInDollars = 12;

  return (
    <div className={styles.assetRow} key={key}>
      <div className={styles.firstColumn}>
        <img src={logo} className={styles.image} />
        <div className={styles.column}>
          <div className={styles.upperItem}>{symbol}</div>
          <div className={styles.lowerItem}>{name}</div>
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.lowerItem}>${(amount * price).toFixed(2)}</div>
      </div>

      <div className={styles.price}>${price.toFixed(2)}</div>
      <div style={{ color: profitInDollars > 0 ? '#0fac6f' : '#EF454A' }}>
        ${profitInDollars.toFixed(2)}
      </div>
      <div style={{ color: percent_change_24h > 0 ? '#0fac6f' : '#EF454A' }}>
        {percent_change_24h.toFixed(2)}%
      </div>
      <div style={{ color: percent_change_7d > 0 ? '#0fac6f' : '#EF454A' }}>
        {percent_change_7d.toFixed(2)}%
      </div>
      <div style={{ color: percent_change_30d > 0 ? '#0fac6f' : '#EF454A' }}>
        {percent_change_30d.toFixed(2)}%
      </div>
    </div>
  );
};
