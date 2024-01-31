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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quas reiciendis, provident excepturi temporibus repellendus rem unde similique quam tempora natus voluptas, impedit illo dolore obcaecati praesentium nostrum inventore ad.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quas reiciendis, provident excepturi temporibus repellendus rem unde similique quam tempora natus voluptas, impedit illo dolore obcaecati praesentium nostrum inventore ad.</p>
            </article>
            <div className={styles.ButtonsPanel}>
                <Link to='/login' className={styles.Button}>Login</Link>
                <Link to='/signUp' className={styles.Button}>Create account</Link>
            </div>
        </div>
    )
};