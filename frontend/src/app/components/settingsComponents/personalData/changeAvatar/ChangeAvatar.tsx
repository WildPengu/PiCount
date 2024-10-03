import styles from "./ChangeAvatar.module.scss";
import { useTranslation } from "react-i18next";
import "../../../../i18next";

export const ChangeAvatar = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.ChangeAvatarContainer}>
      <h3>{t("settingsComponent.changeAva")}</h3>
    </div>
  );
};
