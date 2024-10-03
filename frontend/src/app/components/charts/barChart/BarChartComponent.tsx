import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Cell,
} from 'recharts';
import { DataItems } from '../../../../types/Chart';
import styles from './BarChartComponent.module.scss';

export interface PieChartProps extends IndexType {
  dataChart: DataItems;
}

export interface IndexType {
  name: number;
}

export const BarChartComponent = ({ dataChart }: PieChartProps) => {
  return (
    <ResponsiveContainer className={styles.BarChart} width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={dataChart.categories}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis
          dataKey="category"
          scale="point"
          padding={{ left: 10, right: 10 }}
        />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="value">
          {dataChart.categories.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || '#000000'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
