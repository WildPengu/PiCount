import styles from './Loader.module.scss';

export const Loader = () => {
    return (
        <div className={styles.LoadingContainer}>
            <img  
                src='https://i.redd.it/fcys3yr59dax.gif' 
                alt='Pikachu loader' 
            />
        </div>
    );
};