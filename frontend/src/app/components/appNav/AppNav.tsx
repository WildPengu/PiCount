import styles from './AppNav.module.scss';
import { Link } from "react-router-dom";
import { selectActiveUserId } from '../../../stores/userModule/selectors';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faClockRotateLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { LoginUseAuth } from '../../helpers/LoginUseAuth';
import { UserInfoContainer } from '../userInfoContainer/UserInfoContainer';

export const AppNav = () => {
    const activeUserId = useSelector(selectActiveUserId);
    const { logout } = LoginUseAuth();
    
    return (
        <nav className={styles.AppNav}>
            <UserInfoContainer />
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
                    <li className={styles.AppNavLi}>
                        <Link to='/' onClick={() => logout()}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <br/>Logout
                        </Link>
                    </li>
                </ul>
            }
        </nav>
    );
};

