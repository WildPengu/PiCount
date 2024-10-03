import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from './SelectDate.module.scss';
import '../../i18next';
import { TFunction } from 'i18next';

export interface SelectDateProps {
  setDate?: (date: string) => void;
  label?: string;
  selectModal?: string;
  t: TFunction<'translation', undefined>;
}

export const SelectDate = ({
  setDate,
  label = 'date',
  selectModal,
  t,
}: SelectDateProps) => {
  const [day, setDay] = useState('');

  useEffect(() => {
    if (selectModal === 'filter') {
      setDay('2023-01-01');
    } else {
      const formattedDate = dayjs(new Date()).format('YYYY-MM-DD');
      setDay(formattedDate);
    }
  }, []);

  const handleChange = (newDate: any) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
    setDay(formattedDate);
  };

  useEffect(() => {
    setDate && setDate(day);
  }, [day]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className={styles.SelectDate}
          label={t(`date.${label}`)}
          minDate={dayjs('2023-01-01')}
          maxDate={dayjs(Date())}
          onChange={(newDate) => handleChange(newDate)}
          value={selectModal === 'filter' ? dayjs('2023-01-01') : dayjs(day)}
        />
      </LocalizationProvider>
    </div>
  );
};
