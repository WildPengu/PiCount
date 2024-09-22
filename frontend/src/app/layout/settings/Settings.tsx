import { TopPanel } from "../../components/topPanel/TopPanel";
import styles from "./Settings.module.scss";
import { PersonalData } from "../../components/settingsComponents/personalData/PersonalData";
import { ThemeSwitcher } from "../../components/settingsComponents/themeSwitcher/ThemeSwitcher";
import { useTranslation } from "react-i18next";
import "../../i18next";
import { LanguageSwitcherContainer } from "../../components/settingsComponents/languageSwitcher/LanguageSwitcherContainer";

export const Settings = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.Settings}>
      <TopPanel headerText={t("settings")}>
        <></>
      </TopPanel>
      <div className={styles.SettingsContainer}>
        <PersonalData />
        <ThemeSwitcher />
        <LanguageSwitcherContainer />
      </div>
    </div>
  );
};
