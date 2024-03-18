import _ from "lodash";
import { useEffect, useState } from "react";
import { AppSettingsProvider } from "../../../../config";
import { Loader } from "../../../loader/Loader";
import styles from './MyAssets.module.scss';
import { AssetRow } from './assetRow/AssetRow';

export interface Crypto {
  name: string;
  symbol: string;
  amount: number;
  logo: string;
  quote: any;
}

export const MyAssets = () => {
  const { appSettings } = AppSettingsProvider();
  const [crypto, setCrypto] = useState<Crypto>();
  const [inputAmount, setInputAmount] = useState<number>();
  const [inputSymbol, setInputSymbol] = useState<string>();
  const [assetsPrice, setAssetsPrice] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}`
        );

        setCrypto(await response.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addCrypto = (symbol: string, amount: number) => {
    fetch(`${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        symbol,
        amount
      })
    })
      .catch(error => {
        console.error('An error occured', error);
      });
  };

  let totalAssetsPrice = 0;

  const cryptoRows = _.map(crypto as any, (row: Crypto, index: number) => {
    if (row.quote && row.quote.USD && row.quote.USD.price) {
      const cryptoValue = parseFloat((row.amount * row.quote.USD.price).toFixed(2));
      totalAssetsPrice += cryptoValue;

      return (
        <AssetRow
          key={index}
          name={row.name}
          symbol={row.symbol}
          amount={row.amount}
          logo={row.logo}
          quote={row.quote}
        />
      );
    }
  });

  return (
    <div className={styles.assetsContainer}>
      <h2>Portfolio value: {totalAssetsPrice.toLocaleString('en-US')}$</h2>
      <div className={styles.sortHeader}>
        <div>Coin</div>
        <div>Amount</div>
        <div>Coin Price</div>
        <div>Today's PnL</div>
      </div>
      <div className={styles.assetsList}>
        {crypto ? cryptoRows : <Loader />}
      </div>
      <div>
        <div>
          <span>Amount</span>
          <input
            name='amount'
            type='number'
            min={0.000001}
            step={0.01}
            value={inputAmount}
            onChange={(e) => setInputAmount(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <span>Symbol</span>
          <input
            name='symbol'
            type='string'
            value={inputSymbol}
            onChange={(e) => setInputSymbol(e.target.value)}
          />
        </div>
        <button onClick={() => addCrypto(inputSymbol, inputAmount)}>Add</button>
      </div>
    </div>
  );
};
