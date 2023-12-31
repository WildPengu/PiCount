import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialize, selectActiveUserId, updateExpensesCategories } from '../stores/userModule';
import styles from './App.module.scss';
import { AppNav } from './components/appNav/AppNav';
import { AppRoutes } from './routes/AppRoutes';
import { AppSettingsProvider } from './config';

function App() {
  const dispatch = useDispatch();

  const activeUserId: string = useSelector(selectActiveUserId);
  const { appSettings } = AppSettingsProvider();

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

  }, [])

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
  }, [])

  
  
  return (
    <div className={styles.App}>
      <AppNav />
      <AppRoutes />
    </div>
  );
}

export default App;
