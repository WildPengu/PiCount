import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import { TopPanel } from '../../components/topPanel/TopPanel';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket,  faUserPlus } from '@fortawesome/free-solid-svg-icons';

export const Login = () => {
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
            <form className={styles.LoginForm}>
                <input 
                    className={styles.LoginInput}
                    type='text' 
                    name='username' 
                    placeholder='User Name' 
                />
                <input 
                    className={styles.LoginInput}
                    type='password' 
                    name='password' 
                    placeholder='User password'
                />
                <Button>
                    Login
                </Button>
            </form>
        </div>
    );
};