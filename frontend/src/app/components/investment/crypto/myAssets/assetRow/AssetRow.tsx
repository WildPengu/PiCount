import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Crypto } from '../MyAssets';
import styles from './assetRow.module.scss';

interface AssetRowProps {
  key: number,
  row: Crypto,
  deleteCryptoAsset: (cryptoId: string, symbol: string) => Promise<void>;
  updateCryptoAmount: (amount: number, cryptoId: string, symbol: string) => Promise<void>;
}

export const AssetRow: React.FC<AssetRowProps> = ({ key, row, deleteCryptoAsset, updateCryptoAmount }) => {
  const { amount, logo, name, symbol, cryptoId, quote } = row;
  const { price, percent_change_24h, percent_change_7d, percent_change_30d } = quote.USD;

  const currentValue = amount * price;
  const price_before_24h = price / (1 + (percent_change_24h / 100));

  const profitInDollars = currentValue - (amount * price_before_24h);



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
        <div contentEditable="true" onBlur={(e) => updateCryptoAmount(parseFloat(e.target.textContent), cryptoId, symbol)} className={styles.upperItem}>{amount.toFixed(2)}</div>
        <div className={styles.lowerItem}>${(amount * price).toFixed(2)}</div>
      </div>

      <div className={styles.price}>${price.toFixed(2)}</div>
      <div
        style={{ color: profitInDollars > 0 ? '#0fac6f' : '#EF454A' }}
      >
        ${profitInDollars.toFixed(2)}
      </div>
      <div style={{ color: percent_change_24h > 0 ? '#0fac6f' : '#EF454A' }}>{percent_change_24h.toFixed(2)}%</div>
      <div style={{ color: percent_change_7d > 0 ? '#0fac6f' : '#EF454A' }}>{percent_change_7d.toFixed(2)}%</div>
      <div style={{ color: percent_change_30d > 0 ? '#0fac6f' : '#EF454A' }}>{percent_change_30d.toFixed(2)}%</div>
      <div
        className={styles.trashIcon}
        onClick={() => deleteCryptoAsset(cryptoId, symbol)}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </div>
    </div>
  )
}