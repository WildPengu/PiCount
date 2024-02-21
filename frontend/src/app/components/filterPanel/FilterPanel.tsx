import styles from "./FilterPanel.module.scss";
import { useTranslation } from "react-i18next";
import "../../i18next";
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
  const { t } = useTranslation();

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
          setError(t("filterModal.validation1"));
        } else if (!data[category as string].length) {
          setError(t("filterModal.validation2"));
        }
      })
      .catch((error) => {
        console.error("Błąd pobierania danych:", error);
      });
  };

  return (
    <div className={styles.FilterPanel}>
      <h2 className={styles.FilterPanelH2}>{t("filterModal.filter")}</h2>
      <form className={styles.FilterForm} onSubmit={filteredExpenseList}>
        <div className={styles.FilterPanelContainer}>
          <SelectCategory
            selectModal={"filter"}
            setCategory={setCategory}
            t={t}
          />
          <SelectDate
            label='from'
            selectModal={"filter"}
            setDate={setDateFrom}
            t={t}
          />
          <SelectDate label='to' setDate={setDateTo} t={t} />
        </div>
        <div className={styles.ButtonsPanel}>
          <Button type='submit'>{t("filterModal.filterBtn")}</Button>
          <Button backgroundColor={Color.blue} onClick={resetFilters}>
            {t("reset")}
          </Button>
          <Button
            backgroundColor={Color.gray}
            onClick={() => setIsModalVisible(false)}
          >
            {t("cancel")}
          </Button>
        </div>
      </form>
    </div>
  );
};
