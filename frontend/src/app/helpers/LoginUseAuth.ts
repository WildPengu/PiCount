import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateActiveUserId } from '../../stores/userModule';
import { User } from '../../types/users';
import { AppSettingsProvider } from '../config';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const LoginUseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { appSettings } = AppSettingsProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(
        `${appSettings.apiHost}:${appSettings.apiPort}/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: username,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setError(null);
        dispatch(updateActiveUserId(data._id));
        Cookies.set('user', JSON.stringify(data._id), { expires: 1 });
        navigate('/expenseList');
        window.location.reload()
      } else {
        setUser(null);
        if (!username || !password) {
          setError('Username or password are required.');
          return;
        }
        setError('Incorrect username or password.');
      }
    } catch (error) {
      console.log('error', error);
      setUser(null);
      setError('An error occurred while logging in.');
    }
  };

  const logout = () => {
    setUser(null);
    dispatch(updateActiveUserId(''));
    Cookies.remove('user');
  };

  return { user, error, login, logout };
};

