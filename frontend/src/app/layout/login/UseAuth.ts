import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateActiveUserId } from '../../../stores/userModule';
import { User } from '../../../types/users';
import { appSettings } from '../../config';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      } else {
        setUser(null);
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
  };

  return { user, error, login, logout };
};

