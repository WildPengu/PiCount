import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { initialize, selectActiveUserId, updateActiveUserId, updateExpensesCategories } from '../stores/userModule';
import styles from './App.module.scss';
import { AppNav } from './components/appNav/AppNav';
import { AppRoutes } from './routes/AppRoutes';
import { AppSettingsProvider } from './config';
import { Footer } from './components/footer/Footer';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const activeUserId: string = useSelector(selectActiveUserId);
  
  const { appSettings } = AppSettingsProvider();
  const userCookie = Cookies.get('user');

  useEffect(() => {
    if (userCookie) {
      const activeUserId = JSON.parse(userCookie);
      dispatch(updateActiveUserId( activeUserId ))
    }
  }, [userCookie]);

  useEffect(() => {
    fetch(`${appSettings.apiHost}:${appSettings.apiPort}/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then((data) => {
        dispatch(initialize({ users: data, activeUserId }));
      })
      .catch((error) => {
        console.error('There was a problem with fetching data:', error);
      });

  }, []);

  useEffect(() => {
    fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expensesCategories`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then((data) => {
        dispatch(updateExpensesCategories(data));
      })
      .catch((error) => {
        console.error('There was a problem with fetching data:', error);
      });
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.AppContainer}>
        <AppNav />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};
