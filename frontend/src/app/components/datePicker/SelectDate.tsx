import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

export const SelectDate = () => {
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    minDate={dayjs('2023-01-01')}
                    maxDate={dayjs(Date())}
                    defaultValue={dayjs(Date())} 
                    />
                </LocalizationProvider>
        </div>
    );
};