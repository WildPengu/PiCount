import React from "react";
import styles from "./LanguageSwitcher.module.scss";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", lang: "English" },
  { code: "pl", lang: "Polski" },
  { code: "ua", lang: "Українська" },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.LanguageSwitcherContainer}>
      {languages.map((lng) => {
        return (
          <button
            className={lng.code === i18n.language ? styles.selected : ""}
            key={lng.code}
            onClick={() => changeLanguage(lng.code)}
          >
            {lng.lang}
          </button>
        );
      })}
    </div>
  );
};
