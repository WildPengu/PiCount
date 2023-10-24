import { Link } from 'react-router-dom';
import styles from './StartPage.module.scss';

export const StartPage = () => {
    return (
        <div className={styles.StartPage}>
            <article className={styles.Introduce}>
                <h1>Let`s PiCount!</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quas reiciendis, provident excepturi temporibus repellendus rem unde similique quam tempora natus voluptas, impedit illo dolore obcaecati praesentium nostrum inventore ad.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quas reiciendis, provident excepturi temporibus repellendus rem unde similique quam tempora natus voluptas, impedit illo dolore obcaecati praesentium nostrum inventore ad.</p>
            </article>
            <div className={styles.ButtonsPanel}>
                <Link to='/login' className={styles.Button}>Login</Link>
                <Link to='/signUp' className={styles.Button}>Create an account</Link>
            </div>
        </div>
    )
};