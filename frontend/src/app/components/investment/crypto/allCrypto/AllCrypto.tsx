import { useEffect, useState } from 'react';
import { AppSettingsProvider } from '../../../../config';
import { Loader } from '../../../loader/Loader';
import { TooltipIcon } from '../../../tooltip/TooltipIcon';
import styles from './AllCrypto.module.scss';
import { CryptoRow } from './cryptoRow/CryptoRow';

export const AllCrypto = () => {
  const { appSettings } = AppSettingsProvider();
  const [allCrypto, setAllCrypto] = useState<any>(null);
  const [sortBy, setSortBy] = useState<string>("market_cap");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${appSettings.apiHost}:${appSettings.apiPort}/cryptocurrency/latest?limit=50&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      );
      const result = await response.json();
      if (result.error) {
        setAllCrypto(null);
      } else {
        setAllCrypto(result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setAllCrypto(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOrder, sortBy]);

  const cryptoRows = allCrypto?.map((row: Cryptocurrency, index: number) => {
    return (
      <div key={`${row.id}-${index}`}>
        <CryptoRow
          index={index}
          row={row}
        />
      </div>
    );
  });

  const columns = [
    { key: "#", label: "#" },
    { key: "name", label: "Name", sortable: true },
    { key: "price", label: "Price", sortable: true, alignRight: true },
    { key: "percent_change_1h", label: "1h %", sortable: true, alignRight: true },
    { key: "percent_change_24h", label: "24h %", sortable: true, alignRight: true },
    { key: "percent_change_7d", label: "7d %", sortable: true, alignRight: true },
    { key: "percent_change_30d", label: "30d %", sortable: true, alignRight: true },
    { key: "circulating_supply", label: "Circulating Supply", sortable: true, alignRight: true, tooltip: true },
    { key: "marketCap", label: "Market Cap", sortable: true, alignRight: true, tooltip: true },
    { key: "last7days", label: "Last 7 days", alignRight: true }
  ];


  return (
    <div className={styles.assetsContainer}>
      <div className={styles.sortHeader}>
        {columns.map(({ key, label, sortable, alignRight, tooltip }) => (
          <div
            key={key}
            className={` ${styles.labelContainer} ${alignRight ? styles.alignRight : ""}`}
            onClick={sortable ? () => handleSort(key) : undefined}
          >
            <div className={` ${styles.labelItem} ${sortable ? styles.pointer : ""}`}>{label}</div>
            {tooltip ? <TooltipIcon
              text={`The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.`}
              link={
                'https://support.coinmarketcap.com/hc/en-us/articles/360043396252-Supply-Circulating-Total-Max'
              }
            /> : null}
          </div>
        ))}
      </div>
      <div className={styles.assetsList}>
        {allCrypto ? cryptoRows : <Loader />}
      </div>
    </div>
  );
};
