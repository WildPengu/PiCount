import { useState } from 'react';
import { appSettings } from '../../config';
import { User } from '../../../types/users';


export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    
    try {
      const response = await fetch(`${appSettings.apiHost}:${appSettings.apiPort}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: username,
            password
          }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setError(null);
      } else {
        setUser(null);
        setError('Incorrect username or password.');
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
      setUser(null);
      setError('An error occurred while logging in.');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return { user, error, login, logout };
};

