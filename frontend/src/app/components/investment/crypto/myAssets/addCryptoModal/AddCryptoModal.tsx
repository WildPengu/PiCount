import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from "i18next";
import { useEffect, useState } from "react";
import { AppSettingsProvider } from "../../../../../config";
import Button from "../../../../button/Button";
import styles from './AddCryptoModal.module.scss';

export interface ModalProps {
  setToggleModal: (isVisible: boolean) => void;
  addCrypto: (amount: number, cryptoId: string) => void;
}

export const AddCryptoModal: React.FC<ModalProps> = ({ setToggleModal, addCrypto }) => {
  const { appSettings } = AppSettingsProvider();
  const [cryptoList, setCryptoList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCoinId, setSelectedCoinId] = useState<string>();
  const [quantity, setQuantity] = useState<number>();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {

      fetchCryptoList(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchCryptoList = async (query: string) => {
    let url;

    if (query.trim()) {
      url = `https://api.coingecko.com/api/v3/search?query=${query}`;
    } else {
      url = `${appSettings.apiHost}:${appSettings.apiPort}/cryptocurrency/latest?limit=50`;
    }

    setIsLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.coins) {
        const formattedCoins = result.coins.map((coin: any) => ({
          ...coin,
          image: coin.thumb,
        }));
        setCryptoList(formattedCoins);
      } else {
        setCryptoList(result);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setCryptoList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCrypto = (quantity?: number, coinId?: string) => {
    if (!coinId || !quantity) return;

    addCrypto(quantity, coinId);
    setToggleModal(false)
  };

  return (
    <div className={styles.addCryptoModal}>
      <h2 className={styles.modalHeader}>Select Coin</h2>
      <input
        name="coin"
        type="string"
        onChange={(e) => { setSearchTerm(e.target.value) }}
        placeholder={t('search')}
        className={styles.inputModal}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.cryptoList}>
          {cryptoList.length > 0 ? (
            cryptoList.map((coin) => (
              <div
                key={coin.id}
                className={`${styles.cryptoLine} ${selectedCoinId === coin.id ? styles.selected : ''}`}
                onClick={() => setSelectedCoinId(coin.id)}
              >
                <div className={styles.cryptoItemContainer}>
                  <img src={coin.image} className={styles.image} /> {coin.name} ({coin.symbol.toUpperCase()})
                </div>
                <div className={styles.iconsContainer}>
                  {selectedCoinId === coin.id ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPlus} />}
                </div>

              </div>
            ))
          ) : (
            <p>No coins found.</p>
          )}
        </div>
      )}
      <div>
        <div>
          <label>Quantity:</label>
          <input
            className={styles.quantityInput}
            placeholder='0.00'
            type='number'
            value={quantity}
            onChange={(e) => { setQuantity(parseFloat(e.target.value)) }}>
          </input>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Button onClick={() => handleAddCrypto(quantity, selectedCoinId)} >{t('add')}</Button>
        <Button
          onClick={() => setToggleModal(false)}
        >
          {t('cancel')}
        </Button>
      </div>
    </div>
  )
};