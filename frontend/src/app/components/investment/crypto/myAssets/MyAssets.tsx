import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { AppSettingsProvider } from '../../../../config';
import Button from '../../../button/Button';
import { Loader } from '../../../loader/Loader';
import { Modal } from '../../../modal/Modal';
import styles from './MyAssets.module.scss';
import { AddCryptoModal } from './addCryptoModal/AddCryptoModal';
import { AssetRow } from './assetRow/AssetRow';

export interface Crypto {
  id: string;
  cryptoId: string;
  name: string;
  symbol: string;
  amount: number;
  image: string;
  price: number;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  percent_change_30d: string;
  sparkline_in_7d: {
    price: number[];
  };
}


export const MyAssets = () => {
  const { appSettings } = AppSettingsProvider();
  const [crypto, setCrypto] = useState<Crypto[]>([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}?sortBy=${sortBy}&sortOrder=${sortOrder}`
        );
        const result = await response.json();
        setCrypto(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [sortBy, sortOrder]);

  async function deleteCryptoAsset(cryptoId: string, index: number) {
    try {
      const response = await fetch(
        `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}/${cryptoId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete crypto asset');
      }

      const updateCrypto = [...crypto];
      delete updateCrypto[index];
      setCrypto(updateCrypto);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting crypto asset:', error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  }

  const addCrypto = async (amount: number, cryptoId: string) => {
    if (!amount || !cryptoId) {
      return;
    }

    try {
      const response = await fetch(
        `${appSettings.apiHost}:${appSettings.apiPort}/assets/crypto/${appSettings.user_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            cryptoId,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to add crypto asset');
      }

      const updatedCrypto = await response.json();

      setCrypto(updatedCrypto.data);
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  let totalAssetsPrice = 0;
  let portfolioChange = 0;
  let portfolioChangePercentage = 0;

  const cryptoRows = crypto?.map((row: Crypto, index: number) => {
    const { price, amount, percent_change_24h } = row;
    const currentValue = amount * price;
    const price_before_24h = price / (1 + parseFloat(percent_change_24h) / 100);
    const profitInDollars = currentValue - amount * price_before_24h;
    portfolioChange += profitInDollars;

    const cryptoValue = row.amount * row.price;
    totalAssetsPrice += cryptoValue;

    return (
      <AssetRow
        index={index}
        row={row}
        deleteCryptoAsset={deleteCryptoAsset}
      />
    );
  });

  if (totalAssetsPrice !== 0) {
    portfolioChangePercentage = (portfolioChange / totalAssetsPrice) * 100;
  }

  const columns = [
    { key: "#", label: "#" },
    { key: "name", label: "Name", sortable: true },
    { key: "amount", label: "Holdings", sortable: true, alignRight: true },
    { key: "price", label: "Price", sortable: true, alignRight: true },
    { key: "todayProfit", label: "Today's PnL", sortable: true, alignRight: true },
    { key: "percent_change_1h", label: "1h %", sortable: true, alignRight: true },
    { key: "percent_change_24h", label: "24h %", sortable: true, alignRight: true },
    { key: "percent_change_7d", label: "7d %", sortable: true, alignRight: true },
    { key: "percent_change_30d", label: "30d %", sortable: true, alignRight: true },
    { key: "last7days", label: "Last 7 days", alignRight: true }
  ];

  return (
    <div className={styles.assetsContainer}>
      <div className={styles.chartBoxHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.headerDesc}>
            <div className={styles.headerAvatar}>🚀</div>
            My Portfolio
          </div>
          <h2>${totalAssetsPrice.toLocaleString('en-US')}$</h2>
          <div
            className={styles.portfolioChange}
            style={{ color: portfolioChange > 0 ? '#0fac6f' : '#EF454A' }}
          >
            {portfolioChange.toFixed(2)}$ {portfolioChange ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />} {portfolioChangePercentage.toFixed(2)}% (24h)
          </div>
        </div>
        <Button onClick={() => { setToggleModal(!toggleModal) }}>+ Add Crypto</Button>
      </div>

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
        {crypto ? cryptoRows : <Loader />}
      </div>

      {toggleModal && <Modal>
        {<AddCryptoModal setToggleModal={setToggleModal} addCrypto={addCrypto} />}
      </Modal>}
    </div>
  );
};
