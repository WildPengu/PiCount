import styles from './Loader.module.scss';
import loadind from './loader-picount.gif';

export const Loader = () => {
  return (
    <div className={styles.LoadingContainer}>
      <img src={loadind} alt="Pikachu loader" />
    </div>
  );
};
