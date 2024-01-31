import { Link } from 'react-router-dom';
import styles from './StartPage.module.scss';
import logo from '../../img/main/picount-logo.png';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export const StartPage = () => {
    return (
        <div className={styles.StartPage}>
            <TopPanel headerText="Let`s PiCount!">
                <div className={styles.TopPanelContainer}>
                    <Link to='/login'>
                        <FontAwesomeIcon icon={faRightToBracket} />
                    </Link>
                    <Link to='/signUp'>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </Link>
                </div>
            </TopPanel>
            <div className={styles.LogoContainer}>
                <img className={styles.Logo} src={logo}  />
            </div>
            <article className={styles.Introduce}>
                <p>Hey there! Do you ever find yourself struggling to keep track of your expenses?</p>
                <p>Well, that's where PiCount comes in to make your life easier! With Picount, you can effortlessly manage your finances on a daily basis. Track and analyze your spending, make informed decisions, and take control of your financial journey. Adding transactions is a breeze, and categorizing them helps you understand where your money is going.</p>
                <p>PiCount brings transparency and simplicity to expense tracking, turning the daily chore of managing your finances into an enjoyable experience. So, are you ready to take charge of your financial well-being? PiCount is here for you.</p>
            </article>
            <div className={styles.ButtonsPanel}>
                <Link to='/login' className={styles.Button}>Login</Link>
                <Link to='/signUp' className={styles.Button}>Create account</Link>
            </div>
        </div>
    )
};