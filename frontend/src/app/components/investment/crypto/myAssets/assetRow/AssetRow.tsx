import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PercentageChange } from '../../allCrypto/cryptoRow/percentageChange/PercentageChange';
import { CryptoSparkline } from '../../allCrypto/CryptoSparkLine';
import { Crypto } from '../MyAssets';
import styles from './assetRow.module.scss';

interface AssetRowProps {
  index: number;
  row: Crypto;
  deleteCryptoAsset: (id: string, index: number) => Promise<void>;
  updateCryptoAmount: (
    amount: number,
    assetId: string,
    cryptoId: string,
  ) => Promise<void>;
}

export const AssetRow: React.FC<AssetRowProps> = ({
  index,
  row,
  deleteCryptoAsset,
  updateCryptoAmount,
}) => {
  const { id, cryptoId, amount, image, name, symbol, price, percent_change_1h, percent_change_24h, percent_change_7d, percent_change_30d, sparkline_in_7d } = row;

  const currentValue = amount * price;
  const price_before_24h = price / (1 + parseFloat(percent_change_24h) / 100);

  const profitInDollars = currentValue - amount * price_before_24h;
  console.log(row)
  return (

    <div className={styles.assetRow} key={index}>
      <div>{index + 1}</div>
      <div className={styles.firstColumn}>
        <img src={image} className={styles.image} />
        <div className={styles.column}>
          <div className={styles.upperItem}>{symbol}</div>
          <div className={styles.lowerItem}>{name}</div>
        </div>
      </div>

      <div className={styles.column + ' ' + styles.alignRight}>
        <div
          contentEditable="true"
          onBlur={(e) => {
            const value = e.target.textContent;
            if (value !== null) {
              updateCryptoAmount(parseFloat(value), id, cryptoId);
            }
          }}
          className={styles.upperItem}
        >
          {amount} {symbol}
        </div>
        <div className={styles.lowerItem}>${(amount * price).toFixed(2)}</div>
      </div>

      <div className={styles.price + ' ' + styles.alignRight}>${price}</div>
      <div className={styles.alignRight} style={{ color: profitInDollars > 0 ? '#0fac6f' : '#EF454A' }}>
        ${profitInDollars.toFixed(2)}
      </div>
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
      <CryptoSparkline
        prices={sparkline_in_7d.price}
        priceChangePercentage={parseFloat(percent_change_7d)}
      />
      <div
        className={styles.trashIcon}
        onClick={() => deleteCryptoAsset(id, index)}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </div>
    </div>
  );
};
