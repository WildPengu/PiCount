import { useContext } from 'react';
import styles from './ThemeSwitcher.module.scss';
import { ThemeContext } from '../../../Theme';
import { useTranslation } from 'react-i18next';
import '../../../i18next';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <div className={`${styles.ThemeSwitcherContainer} ${theme}Container`}>
      <h2>{t('settingsComponent.theme')}</h2>
      <label className={styles.SwitchLabel}>
        <input
          type="checkbox"
          className={styles.SliderInput}
          checked={theme === 'LightTheme'}
          onChange={toggleTheme}
        />
        <span className={styles.Slider + ' ' + styles.Round}></span>
      </label>
    </div>
  );
};
