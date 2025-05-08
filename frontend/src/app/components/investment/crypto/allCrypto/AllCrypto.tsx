
import { useEffect, useState } from 'react';
import { AppSettingsProvider } from '../../../../config';
import { Loader } from '../../../loader/Loader';
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
    { key: "circulating_supply", label: "Circulating Supply", sortable: true, alignRight: true },
    { key: "marketCap", label: "Market Cap", sortable: true, alignRight: true },
    { key: "last7days", label: "Last 7 days", alignRight: true }
  ];


  return (
    <div className={styles.assetsContainer}>
      <div className={styles.sortHeader}>
        {columns.map(({ key, label, sortable, alignRight }) => (
          <div
            key={key}
            className={`${alignRight ? styles.alignRight : ""} ${sortable ? styles.pointer : ""}`}
            onClick={sortable ? () => handleSort(key) : undefined}
          >
            {label}
          </div>
        ))}
      </div>
      <div className={styles.assetsList}>
        {allCrypto ? cryptoRows : <Loader />}
      </div>
    </div>
  )
}