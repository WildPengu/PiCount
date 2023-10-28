import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initialize } from '../stores/userModule';
import styles from './App.module.scss';
import { AppNav } from './components/appNav/AppNav';
import { AppRoutes } from './routes/AppRoutes';
import { appSettings } from './config';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${appSettings.apiHost}:${appSettings.apiPort}/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then((data) => {
        dispatch(initialize({ users: data, activeUserId: '653a222e8ade4cb129d8a44c' }));
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
