import styles from './SortedPanel.module.scss';
import { SelectCategory } from '../selectCategory/SelectCategory';
import { SelectDate } from '../datePicker/SelectDate';
import { Color } from '../../types/Enums';
import Button from '../button/Button';


export const SortedPanel = () => {
    
    return (
        <div className={styles.SortedPanel}>
            <div className={styles.SortedPanelContainer}>
                <h2>Sort of</h2>
                <form className={styles.Sortedform}>
                    <SelectCategory />
                    <SelectDate />
                    <Button backgroundColor={Color.blue}>
                        Sort
                    </Button>
                </form>
            </div>
        </div>
    );
};