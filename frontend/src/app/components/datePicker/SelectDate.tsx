import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

export interface SelectDateProps {
    setDate?: (date: string) => void;
}

export const SelectDate = ({ setDate }: SelectDateProps) => {

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    minDate={dayjs('2023-01-01')}
                    maxDate={dayjs(Date())}
                    defaultValue={dayjs(Date())} 
                    onChange={(newDate) => {
                        if (setDate) {
                            const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
                            setDate(formattedDate);
                        }
                    }}
                    />
                </LocalizationProvider>
        </div>
    );
};