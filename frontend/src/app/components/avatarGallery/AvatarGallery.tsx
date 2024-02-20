import React from "react";
import styles from "./AvatarGallery.module.scss";
import { useTranslation } from "react-i18next";
import "../../i18next";

interface AvatarGalleryProps {
  avatars: string[];
  onAvatarSelect: (selectedAvatar: string) => void;
  selectedAvatar: string;
}

export const AvatarGallery: React.FC<AvatarGalleryProps> = ({
  avatars,
  onAvatarSelect,
  selectedAvatar,
}) => {
  const { t } = useTranslation();

  const handleAvatarClick = (avatar: string) => {
    onAvatarSelect(avatar);
  };

  return (
    <div className={styles.AvatarGalleryContainer}>
      <p className={styles.AvatarGalleryTxt}>{t("signUpComponent.userIco")}</p>
      <div className={styles.AvatarGallery}>
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index}`}
            className={avatar === selectedAvatar ? styles.SelectedAvatar : ""}
            onClick={() => handleAvatarClick(avatar)}
          />
        ))}
      </div>
    </div>
  );
};
