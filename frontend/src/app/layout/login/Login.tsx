import {
  faRightFromBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { LoginUseAuth } from '../../helpers/LoginUseAuth';
import '../../i18next';
import logo from '../../img/main/picount-logo.png';
import styles from './Login.module.scss';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = LoginUseAuth();
  const { t } = useTranslation();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className={styles.Login}>
      <TopPanel headerText={t('loginComponent.enter')}>
        <div className={styles.TopPanelContainer}>
          <Link to="/">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Link>
          <Link to="/signUp">
            <FontAwesomeIcon icon={faUserPlus} />
          </Link>
        </div>
      </TopPanel>
      <div className={styles.LogoContainer}>
        <h1>Let's</h1>
        <img className={styles.Logo} src={logo} />
      </div>
      <form
        className={styles.LoginForm}
        onSubmit={(e) => handleLogin(e)}
        method="POST"
      >
        {error && <h2 data-testid="login-error">{error}</h2>}
        <input
          data-testid="login-username"
          className={styles.LoginInput}
          type="text"
          name="username"
          placeholder={t('loginComponent.username')}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          data-testid="login-password"
          className={styles.LoginInput}
          type="password"
          name="password"
          placeholder={t('loginComponent.userPass')}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button dataTestId={'login-button'} type="submit">
          {t('login')}
        </Button>
      </form>
    </div>
  );
};
