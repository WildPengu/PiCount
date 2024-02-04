import styles from "./FilterPanel.module.scss";
import { SelectCategory } from "../selectCategory/SelectCategory";
import { SelectDate } from "../datePicker/SelectDate";
import { Color } from "../../types/Enums";
import Button from "../button/Button";
import { FormEvent, useState } from "react";
import { AppSettingsProvider } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { updateExpenses } from "../../../stores/userModule/actions";
import { selectActiveUserId } from "../../../stores/userModule";

export interface ModalProps {
  setIsModalVisible: (isVisible: boolean) => void;
}

export interface FilterPanelProps extends ModalProps {
  setError: (errorMessage: string) => void;
}

export const FilterPanel = ({
  setIsModalVisible,
  setError,
}: FilterPanelProps) => {
  const [category, setCategory] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const { appSettings } = AppSettingsProvider();
  const activeUserId = useSelector(selectActiveUserId);
  const dispatch = useDispatch();

  const resetFilters = () => {
    fetch(
      `${appSettings.apiHost}:${appSettings.apiPort}/expenses/expensesByDay/${activeUserId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategory("");
        setDateFrom("");
        setDateTo("");
        setError("");
        setIsModalVisible(false);
        dispatch(updateExpenses(data));
      })
      .catch((error) => {
        console.error("Błąd pobierania danych:", error);
      });
  };

  const filteredExpenseList = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(
      `${appSettings.apiHost}:${appSettings.apiPort}/expenses/expensesByCategory/${activeUserId}?startDate=${dateFrom}&endDate=${dateTo}&category=${category}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsModalVisible(false);
        dispatch(updateExpenses(data));
        setError("");
        if (!Object.keys(data).length) {
          setError("You do not have any expenses in this time yet.");
        } else if (!data[category as string].length) {
          setError("You do not have any expenses in category:");
        }
      })
      .catch((error) => {
        console.error("Błąd pobierania danych:", error);
      });
  };

  return (
    <div className={styles.FilterPanel}>
      <h2 className={styles.FilterPanelH2}>Filter</h2>
      <form className={styles.FilterForm} onSubmit={filteredExpenseList}>
        <div className={styles.FilterPanelContainer}>
          <SelectCategory selectModal={"filter"} setCategory={setCategory} />
          <SelectDate
            label='From'
            selectModal={"filter"}
            setDate={setDateFrom}
          />
          <SelectDate label='To' setDate={setDateTo} />
        </div>
        <div className={styles.ButtonsPanel}>
          <Button type='submit'>Filter</Button>
          <Button backgroundColor={Color.blue} onClick={resetFilters}>
            Reset
          </Button>
          <Button
            backgroundColor={Color.gray}
            onClick={() => setIsModalVisible(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
