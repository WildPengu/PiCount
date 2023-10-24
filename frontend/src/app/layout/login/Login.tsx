import Button from '../../components/button/Button';
import styles from './Login.module.scss';

export const Login = () => {
    return (
        <div className={styles.Login}>
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