import { useContext } from "react";
import { ThemeContext } from "../../../Theme";
import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./LanguageSwitcher.module.scss";
import { useTranslation } from "react-i18next";

export const LanguageSwitcherContainer = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.LanguageSwitcherContainer} ${theme}Container`}>
      <h2 data-testid='choose-lang'>{t("settingsComponent.language")}</h2>
      <LanguageSwitcher />
    </div>
  );
};
