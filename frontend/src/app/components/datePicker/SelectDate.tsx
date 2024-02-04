import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styles from "./SelectDate.module.scss";

export interface SelectDateProps {
  setDate?: (date: string) => void;
  label?: "Select Date" | "From" | "To";
  selectModal?: string;
}

export const SelectDate = ({
  setDate,
  label = "Select Date",
  selectModal,
}: SelectDateProps) => {
  const [day, setDay] = useState("");

  useEffect(() => {
    if (selectModal === "filter") {
      setDay("2023-01-01");
    } else {
      const formattedDate = dayjs(new Date()).format("YYYY-MM-DD");
      setDay(formattedDate);
    }
  }, []);

  const handleChange = (newDate: any) => {
    const formattedDate = dayjs(newDate).format("YYYY-MM-DD");
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
          label={label}
          minDate={dayjs("2023-01-01")}
          maxDate={dayjs(Date())}
          onChange={(newDate) => handleChange(newDate)}
          value={selectModal === "filter" ? dayjs("2023-01-01") : dayjs(day)}
        />
      </LocalizationProvider>
    </div>
  );
};
