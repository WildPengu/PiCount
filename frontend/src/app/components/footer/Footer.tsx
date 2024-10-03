import styles from './Footer.module.scss';
import logo from '../../img/main/picount-logo.png';

export const Footer = () => {
  return (
    <div className={styles.FooterWave}>
      <svg
        className={styles.Waves}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className={styles.parallax}>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(108,214,237,0.8)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(149,48,234,1)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(149,48,234,0.5)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="6"
            fill="rgba(108,214,237,0.3)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="7"
            fill="rgba(149,48,234,0.3)"
          />
        </g>
      </svg>
      <img className={styles.FooterLogo} src={logo} />
    </div>
  );
};
