type PercentageChangeProps = {
  value: number | string;
};

export const PercentageChange: React.FC<PercentageChangeProps> = ({ value }) => {

  if (typeof value !== 'number') {
    return <span style={{ color: '#888' }}>N/A</span>;
  }

  const color = value > 0 ? '#0fac6f' : '#EF454A';
  return <span style={{ color }}>{value.toFixed(2)}%</span>;
};
