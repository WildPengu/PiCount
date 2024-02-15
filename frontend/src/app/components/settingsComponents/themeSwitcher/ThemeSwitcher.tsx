import { useContext } from "react";
import styles from "./ThemeSwitcher.module.scss";
import { ThemeContext } from "../../../Theme";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`${styles.ThemeSwitcherContainer} ${theme}Container`}>
      <h2>Theme Switcher</h2>
      <label className={styles.SwitchLabel}>
        <input
          type='checkbox'
          className={styles.SliderInput}
          checked={theme === "LightTheme"}
          onChange={toggleTheme}
        />
        <span className={styles.Slider + " " + styles.Round}></span>
      </label>
    </div>
  );
};
