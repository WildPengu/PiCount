import { TFunction } from "i18next";
import { ChangeEvent, useEffect, useState } from "react";
import { AppSettingsProvider } from "../../config";
import "../../i18next";
import styles from "./Selectcategory.module.scss";

export interface Category {
  _id: string;
  name: string;
}

export interface SelectCategoryProps {
  setCategory?: (category: string) => void;
  selectModal?: string;
  t: TFunction<"translation", undefined>;
}

export const SelectCategory = ({
  selectModal,
  setCategory,
  t,
}: SelectCategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeOption, setActiveOption] = useState<string>("");
  const { appSettings } = AppSettingsProvider();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `${appSettings.apiHost}:${appSettings.apiPort}/expensesCategories`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryName = e.target.value;
    setActiveOption(selectedCategoryName);
  };

  useEffect(() => {
    if (selectModal === "filter") {
      setActiveOption("All");
    } else {
      setActiveOption("Shopping");
    }
  }, []);

  useEffect(() => {
    setCategory && setCategory(activeOption);
  }, [activeOption]);

  return (
    <div className={styles.SelectCategory}>
      <label htmlFor='typeOfExpense' className={styles.CategoryLabel}>
        {t("addNewExpense.selectCat")}
      </label>
      <select
        id='typeOfExpense'
        className={styles.CategoryOfExpense}
        onChange={(e) => handleChangeCategory(e)}
        value={activeOption}
      >
        {selectModal === "filter" ? (
          <option key={"All"} value={"All"}>
            {t("category.All")}
          </option>
        ) : null}
        {categories.map((category) => (
          <option key={category._id} value={category.name}>
            {t(`category.${category.name}`)}
          </option>
        ))}
      </select>
    </div>
  );
};
