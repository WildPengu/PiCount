import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export interface SelectDateProps {
    setDate?: (date: string) => void;
}

export const SelectDate = ({ setDate }: SelectDateProps) => {

    const [day, setDay] = useState('');

    useEffect(() => {
        const formattedDate = dayjs(new Date()).format('YYYY-MM-DD');
        setDay(formattedDate);
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
                    label="Select Date"
                    minDate={dayjs('2023-01-01')}
                    maxDate={dayjs(Date())}
                    onChange={(newDate) => handleChange(newDate)}
                    value={dayjs(day)}
                    />
                </LocalizationProvider>
        </div>
    );
};