import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { TopPanel } from "../../components/topPanel/TopPanel";
import "../../i18next";
import logo from "../../img/main/picount-logo.png";
import styles from "./StartPage.module.scss";

interface IntroduceType {
  article1: string;
  article2: string;
  article3: string;
}

export const StartPage = () => {
  const { t } = useTranslation();
  const { article1, article2, article3 } = t(
    'introduce',
  ) as unknown as IntroduceType;

  return (
    <div className={styles.StartPage}>
      <TopPanel headerText="Let`s PiCount!">
        <div className={styles.TopPanelContainer}>
          <Link to="/login">
            <FontAwesomeIcon icon={faRightToBracket} />
          </Link>
          <Link to="/signUp">
            <FontAwesomeIcon icon={faUserPlus} />
          </Link>
        </div>
      </TopPanel>
      <div className={styles.LogoContainer}>
        <img className={styles.Logo} src={logo} />
      </div>
      <article className={styles.Introduce}>
        <p data-testid="article1">{article1}</p>
        <p>{article2}</p>
        <p>{article3}</p>
      </article>
      <div className={styles.ButtonsPanel}>
        <Link to='/login' className={styles.Button} data-testid='login-link'>
          {t("login")}
        </Link>
        <Link to='/signUp' className={styles.Button} data-testid='sign-up-link'>
          {t("create")}
        </Link>
      </div>
    </div>
  );
};
