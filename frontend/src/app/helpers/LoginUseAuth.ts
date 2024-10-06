import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateActiveUserId } from '../../stores/userModule';
import { User } from '../../types/users';
import { AppSettingsProvider } from '../config';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../i18next';
interface LoginType {
  validation1: string;
  validation2: string;
  validation3: string;
}

export const LoginUseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { appSettings } = AppSettingsProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { validation1, validation2, validation3 } = t(
    'loginComponent',
  ) as unknown as LoginType;

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
        },
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setError(null);
        dispatch(updateActiveUserId(data._id));
        Cookies.set('user', JSON.stringify(data._id), { expires: 1 });
        navigate('/expenseList');
        window.location.reload();
      } else {
        setUser(null);
        if (!username || !password) {
          setError(validation1);
          return;
        }
        setError(validation2);
      }
    } catch (error) {
      console.log('error', error);
      setUser(null);
      setError(validation3);
    }
  };

  const logout = () => {
    setUser(null);
    dispatch(updateActiveUserId(''));
    Cookies.remove('user');
  };

  return { user, error, login, logout };
};
