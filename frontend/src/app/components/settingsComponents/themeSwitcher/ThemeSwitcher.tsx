import styles from "./ThemeSwitcher.module.scss";

export const ThemeSwitcher = () => {
  return (
    <div className={styles.ThemeSwitcherContainer}>
      <h2>Theme Switcher</h2>
      <label id='SwitchLabel' className={styles.SwitchLabel}>
        <input
          type='checkbox'
          id='SliderInput'
          className={styles.SliderInput}
        />
        <span className={styles.Slider + "" + styles.Round}></span>
      </label>
    </div>
  );
};
