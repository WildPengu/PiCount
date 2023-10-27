import styles from './AppNav.module.scss'
import { Link } from "react-router-dom"
import logo from './avatar-pikachu-1.jpg'

export const AppNav = () => {
    return (
        <nav className={styles.AppNav}>
            <div className={styles.AppNavInfContainer}>
                <img className={styles.AppNavIcon} src={logo} alt="Pikachu"/>
                <p className={styles.AppNavUsername}>PiCount</p>
            </div>
            <hr className={styles.AppNavHr}/>
            <ul className={styles.AppNavUl}>
                <li className={styles.AppNavLi}>
                    <Link to='/expenseList'>Expense List</Link>
                </li>
                <li className={styles.AppNavLi}>
                    <Link to='/signUp'>Sign Up</Link>
                </li>
                <li className={styles.AppNavLi}>
                    <Link to='/'>Logout</Link>
                </li>
            </ul>
        </nav>
    );
};