import { TopPanel } from "../../components/topPanel/TopPanel";
import styles from "./Settings.module.scss";
import { ThemeSwitcher } from "../../components/settingsComponents/themeSwitcher/ThemeSwitcher";

export const Settings = () => {
  return (
    <div className={styles.Settings}>
      <TopPanel headerText='Settings'>
        <></>
      </TopPanel>
      <div className={styles.SettingsContainer}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
