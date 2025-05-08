import styles from './CirculatingSupply.module.scss';

type CirculatingSupplyProps = {
  circulatingSupply: number;
  maxSupply?: number | null;
  symbol: string;
};

export const CirculatingSupply: React.FC<CirculatingSupplyProps> = ({ circulatingSupply, maxSupply, symbol }) => {
  const percentage = maxSupply ? (circulatingSupply / maxSupply) * 100 : 0;

  return (
    <div>
      {parseFloat(circulatingSupply.toFixed(0)).toLocaleString('en-US')} {symbol.toUpperCase()}
      {maxSupply && (
        <div className={styles.circulatingSupplyBar}>
          <div
            className={styles.circulatingSupplyBarFiller}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};
