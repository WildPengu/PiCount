import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initialize } from '../stores/userModule';
import styles from './App.module.scss';
import { AppNav } from './components/appNav/AppNav';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then((data) => {
        dispatch(initialize({ users: data, activeUser: '' }));
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
