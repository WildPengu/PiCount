import styles from './AppNav.module.scss';
import { Link } from "react-router-dom";
import { selectActiveUserId, selectUsers } from '../../../stores/userModule/selectors';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import logo from './avatar-pikachu-1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

export const AppNav = () => {

    const users = useSelector(selectUsers);
    const activeUserId = useSelector(selectActiveUserId);
    const [userActive, setUserActive] = useState(true)

    return (
        <nav className={styles.AppNav}>
            <div className={styles.AppNavInfContainer}>
                <img className={styles.AppNavIcon} src={userActive ? users[activeUserId]?.avatar : logo} alt="UserAvatar"/>
                <p className={styles.AppNavUsername}>{userActive ? users[activeUserId]?.name : 'PiCount'}</p>
            </div>
            <hr className={styles.AppNavHr}/>
            {userActive && 
                <ul className={styles.AppNavUl}>
                    <li className={styles.AppNavLi}>
                        <Link to='/expenseList'>
                            <FontAwesomeIcon icon={faClockRotateLeft} /> 
                            <br/>History
                        </Link>
                    </li>
                    <li className={styles.AppNavLi}>
                        <Link to='/'>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            <br/>Logout
                        </Link>
                    </li>
                </ul>
            }
        </nav>
    );
};