import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import {
  initialize,
  selectActiveUserId,
  updateActiveUserId,
  updateExpensesCategories,
} from '../stores/userModule';
import styles from './App.module.scss';
import { AppNav } from './components/appNav/AppNav';
import { AppRoutes } from './routes/AppRoutes';
import { AppSettingsProvider } from './config';
import { Footer } from './components/footer/Footer';
import { ThemeContext } from './Theme';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const activeUserId: string = useSelector(selectActiveUserId);
  const { theme } = useContext(ThemeContext);
  const { appSettings } = AppSettingsProvider();
  const userCookie = Cookies.get('user');

  useEffect(() => {
    if (userCookie) {
      const activeUserId = JSON.parse(userCookie);
      dispatch(updateActiveUserId(activeUserId));
    }
  }, [dispatch, userCookie]);

  useEffect(() => {
    fetch(`${appSettings.apiHost}:${appSettings.apiPort}/users`)
      .then((response) => response.json())
      .then((data) => dispatch(initialize({ users: data, activeUserId })))
      .catch((error) => console.error('Error fetching users data:', error));
  }, [dispatch, appSettings.apiHost, appSettings.apiPort, activeUserId]);

  useEffect(() => {
    fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expensesCategories`)
      .then((response) => response.json())
      .then((data) => dispatch(updateExpensesCategories(data)))
      .catch((error) =>
        console.error('Error fetching expenses categories data:', error),
      );
  }, [dispatch, appSettings.apiHost, appSettings.apiPort]);

  return (
    <div className={`${styles.App} ${theme}`}>
      <div className={styles.AppContainer}>
        <AppNav />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};
