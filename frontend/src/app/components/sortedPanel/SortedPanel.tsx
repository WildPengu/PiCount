import styles from './SortedPanel.module.scss';
import { SelectCategory } from '../selectCategory/SelectCategory';
import { SelectDate } from '../datePicker/SelectDate';
import { Color } from '../../types/Enums';
import Button from '../button/Button';

export interface ModalProps {
    setIsModalVisible: (isVisible: boolean) => void;
  }

export const SortedPanel = ({ setIsModalVisible }:ModalProps) => {
    
    return (
        <div className={styles.SortedPanel}>
            <div className={styles.SortedPanelContainer}>
                <h2>Sort of</h2>
                <form className={styles.SortedForm}>
                    <SelectCategory />
                    <SelectDate />
                </form>
                <div className={styles.ButtonsPanel}>
                        <Button backgroundColor={Color.blue}>
                            Filter
                        </Button>
                        <Button backgroundColor={Color.gray} onClick={() => setIsModalVisible(false)}>
                            Cancel
                        </Button>
                    </div>
            </div>
        </div>
    );
};