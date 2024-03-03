interface InvestProps {
    setLoading: (loading: boolean) => void;
  }
export const GoldChart: React.FC<InvestProps> = ({ setLoading }) => {
    return (
        <div>
            <h1>Gold</h1>
        </div>
    );
};