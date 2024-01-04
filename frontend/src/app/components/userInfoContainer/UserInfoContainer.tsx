import { useSelector } from 'react-redux';
import styles from './UserInfoContainer.module.scss';
import { selectActiveUserId, selectUsers } from '../../../stores/userModule';
import logo from '../../img/avatarsImage/logo-pikachu.jpg';

export const UserInfoContainer = () => {

    const users = useSelector(selectUsers);
    const activeUserId = useSelector(selectActiveUserId);
    
    return (
        <div className={styles.UserInfoContainer}>
            <div className={styles.UserContainer}>
                <div className={styles.AvatarContainer}>
                    <img className={styles.Avatar} src={activeUserId ? users[activeUserId]?.avatar : logo} alt=""/>
                </div>
                <p className={styles.AppNavUsername}>{activeUserId ? users[activeUserId]?.name : 'PiCount'}</p>
            </div>
            
            <hr className={styles.AppNavHr}/>
        </div>
    );
};