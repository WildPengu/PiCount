import React, { useState } from 'react';
import styles from './AvatarGallery.module.scss'

interface AvatarGalleryProps {
  avatars: string[];
  onAvatarSelect: (selectedAvatar: string) => void;
}

export const AvatarGallery: React.FC<AvatarGalleryProps> = ({ avatars, onAvatarSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleAvatarClick = (avatar: string) => {
    setSelectedAvatar(avatar);
    onAvatarSelect(avatar);
  };

  console.log(selectedAvatar);
  

  return (
    <div className={styles.AvatarGalleryContainer}>
      <p className={styles.AvatarGalleryTxt}>Choose Your Pokemon Avatar</p>
      <div className={styles.AvatarGallery}>
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index}`}
            className={avatar === selectedAvatar ? styles.SelectedAvatar : ''}
            onClick={() => handleAvatarClick(avatar)}
          />
        ))}
      </div>
    </div>
  );
};

