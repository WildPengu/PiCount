import styles from './LanguageSwitcher.module.scss';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', lang: 'English' },
  { code: 'pl', lang: 'Polski' },
  { code: 'ua', lang: 'Українська' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <select
        name="lang"
        onChange={(e) => changeLanguage(e.target.value)}
        className={styles.LanguageSelect}
      >
        {languages.map((lng) => {
          return (
            <option
              key={lng.code}
              value={lng.code}
              selected={lng.code === i18n.language}
            >
              {lng.lang}
            </option>
          );
        })}
      </select>
    </>
  );
};
