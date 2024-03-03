import axios from "axios";
import { useEffect } from "react";
interface InvestProps {
  setLoading: (loading: boolean) => void;
}

export const CryptoChart: React.FC<InvestProps> = ({ setLoading }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
        );
        const jsonData = response.data;
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>All Cryptos</h1>
    </div>
  );
};
