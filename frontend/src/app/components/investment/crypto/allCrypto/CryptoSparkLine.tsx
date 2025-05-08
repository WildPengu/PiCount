import { Sparklines, SparklinesLine } from 'react-sparklines';

type SparklineProps = {
  prices: number[];
  priceChangePercentage: number;
};

export const CryptoSparkline: React.FC<SparklineProps> = ({
  prices,
  priceChangePercentage,
}) => {
  if (!prices || prices.length === 0) {
    return <div>No data available</div>;
  }

  const lineColor = priceChangePercentage > 0 ? '#0fac6f' : '#EF454A';

  return (
    <Sparklines data={prices} style={{ background: 'none' }}>
      <SparklinesLine color={lineColor} style={{ fill: 'none' }} />
    </Sparklines>
  );
};
