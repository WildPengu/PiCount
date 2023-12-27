import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import { TopPanel } from '../../components/topPanel/TopPanel';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket,  faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FC, useState } from 'react';
import { useAuth } from './UseAuth';

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, login, error } = useAuth();

    const handleLogin = () => {
        login(username, password);
    };
    return (
        <div className={styles.Login}>
            <TopPanel headerText="Enter Your Account">
                <div className={styles.TopPanelContainer}>
                    <Link to='/'>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </Link>
                    <Link to='/signUp'>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </Link>
                </div>
            </TopPanel>
            <form className={styles.LoginForm} onSubmit={handleLogin}>
                {error && <h2>{error}</h2>}
                <input 
                    className={styles.LoginInput}
                    type='text' 
                    name='username' 
                    placeholder='User Name' 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    className={styles.LoginInput}
                    type='password' 
                    name='password' 
                    placeholder='User password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type='submit' formAction='/expenseList'>
                    Login
                </Button>
            </form>
        </div>
    );
};