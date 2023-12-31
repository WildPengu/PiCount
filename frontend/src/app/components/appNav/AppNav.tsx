import styles from './AppNav.module.scss';
import { Link } from "react-router-dom";
import { selectActiveUserId, selectUsers } from '../../../stores/userModule/selectors';
import { useSelector } from 'react-redux';
import logo from './avatar-pikachu-1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faClockRotateLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../layout/login/UseAuth';

export const AppNav = () => {

    const users = useSelector(selectUsers);
    const activeUserId = useSelector(selectActiveUserId);
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };
    
    return (
        <nav className={styles.AppNav}>
            <div className={styles.AppNavInfContainer}>
                <img className={styles.AppNavIcon} src={activeUserId ? users[activeUserId]?.avatar : logo} alt="UserAvatar"/>
                <p className={styles.AppNavUsername}>{activeUserId ? users[activeUserId]?.name : 'PiCount'}</p>
            </div>
            <hr className={styles.AppNavHr}/>
            {activeUserId && 
                <ul className={styles.AppNavUl}>
                    <li className={styles.AppNavLi}>
                        <Link to='/expenseList'>
                            <FontAwesomeIcon icon={faClockRotateLeft} /> 
                            <br/>History
                        </Link>
                    </li>
                    <li className={styles.AppNavLi}>
                        <Link to='/expenseChart'>
                            <FontAwesomeIcon icon={faChartPie} /> 
                            <br/>Chart
                        </Link>
                    </li>
                    <li className={styles.AppNavLi} onClick={handleLogout}>
                        <Link to='/'>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <br/>Logout
                        </Link>
                    </li>
                </ul>
            }
        </nav>
    );
};

