import styles from "./AppNav.module.scss";
import { Link } from "react-router-dom";
import { selectActiveUserId } from "../../../stores/userModule/selectors";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faClockRotateLeft,
  faRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { LoginUseAuth } from "../../helpers/LoginUseAuth";
import { UserInfoContainer } from "../userInfoContainer/UserInfoContainer";
import { ThemeContext } from "../../Theme";
import { useContext } from "react";

export const AppNav = () => {
  const activeUserId = useSelector(selectActiveUserId);
  const { logout } = LoginUseAuth();

  const { theme } = useContext(ThemeContext);

  return (
    <nav className={styles.AppNav}>
      <UserInfoContainer />
      {activeUserId && (
        <ul className={`${styles.AppNavUl} ${theme}Nav`}>
          <li className={styles.AppNavLi}>
            <Link to='/expenseList'>
              <FontAwesomeIcon icon={faClockRotateLeft} />
              <span>History</span>
            </Link>
          </li>
          <li className={styles.AppNavLi}>
            <Link to='/expenseChart'>
              <FontAwesomeIcon icon={faChartPie} />
              <span>Chart</span>
            </Link>
          </li>
          <li className={styles.AppNavLi}>
            <Link to='/settings'>
              <FontAwesomeIcon icon={faGear} />
              <span>Settings</span>
            </Link>
          </li>
          <li className={styles.AppNavLi}>
            <Link to='/' onClick={() => logout()}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
