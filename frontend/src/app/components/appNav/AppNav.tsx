import styles from './AppNav.module.scss';
import { useTranslation } from 'react-i18next';
import '../../i18next';
import { NavLink } from 'react-router-dom';
import { selectActiveUserId } from '../../../stores/userModule/selectors';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faClockRotateLeft,
  faRightFromBracket,
  faGear,
  faMoneyBillTrendUp,
} from '@fortawesome/free-solid-svg-icons';
import { LoginUseAuth } from '../../helpers/LoginUseAuth';
import { UserInfoContainer } from '../userInfoContainer/UserInfoContainer';
import { ThemeContext } from '../../Theme';
import { useContext } from 'react';
import { LanguageSwitcher } from '../settingsComponents/languageSwitcher/LanguageSwitcher';

export const AppNav = () => {
  const activeUserId = useSelector(selectActiveUserId);
  const { logout } = LoginUseAuth();
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <nav className={styles.AppNav}>
      <UserInfoContainer />
      {activeUserId ? (
        <ul className={`${styles.AppNavUl} ${theme}Nav`}>
          <li className={styles.AppNavLi}>
            <NavLink to="/expenseList" className={({ isActive }) => (isActive ? `${theme}ActiveLink` : "")}>
              <FontAwesomeIcon icon={faClockRotateLeft} />
              <span>{t('history')}</span>
            </NavLink>
          </li>
          <li className={styles.AppNavLi}>
            <NavLink to="/expenseChart" className={({ isActive }) => (isActive ? `${theme}ActiveLink` : "")}>
              <FontAwesomeIcon icon={faChartPie} />
              <span>{t('chartNav')}</span>
            </NavLink>
          </li>
          <li className={styles.AppNavLi}>
            <NavLink to="/investment" className={({ isActive }) => (isActive ? `${theme}ActiveLink` : "")}>
              <FontAwesomeIcon icon={faMoneyBillTrendUp} />
              <span>{t('invest.investment')}</span>
            </NavLink>
          </li>
          <li className={styles.AppNavLi}>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? `${theme}ActiveLink` : "")}>
              <FontAwesomeIcon icon={faGear} />
              <span>{t('settings')}</span>
            </NavLink>
          </li>
          <li className={styles.AppNavLi}>
            <NavLink to="/" onClick={() => logout()}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>{t('logout')}</span>
            </NavLink>
          </li>
        </ul>
      ) : (
        <div className={styles.AppNavWithoutId}>
          <LanguageSwitcher />
        </div>
      )}
    </nav>
  );
};
