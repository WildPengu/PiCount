import styles from './assetRow.module.scss';


export const AssetRow = () => {

  return (
    <div className={styles.assetRow}>
      <div className={styles.firstColumn}>
        <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" className={styles.image} />
        <div className={styles.column}>
          <div className={styles.upperItem}>Link</div>
          <div className={styles.lowerItem}>ChainLink</div>
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.upperItem}>18.08</div>
        <div className={styles.lowerItem}>$376.98</div>
      </div>

      <div className={styles.price}>$20.86</div>
      <div className={styles.todaysPnL}>+ $15,75</div>
    </div>
  )
}