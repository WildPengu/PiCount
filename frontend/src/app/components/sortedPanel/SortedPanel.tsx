import styles from './SortedPanel.module.scss';
import { SelectCategory } from '../selectCategory/SelectCategory';
import { useState } from 'react';
import Button, { ButtonBgColor } from '../button/Button';
import { Modal } from '../modal/Modal';
import { AddExpense } from '../../layout/addExpense/AddExpense';
import { SelectDate } from '../datePicker/SelectDate';


export const SortedPanel = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    
    return (
        <div className={styles.SortedPanel}>
            <div className={styles.SortedPanelContainer}>
                <h2>Sort of</h2>
                <form className={styles.Sortedform}>
                    <SelectCategory />
                    <SelectDate />
                    <Button backgroundColor={ButtonBgColor.blue}>
                        Sort
                    </Button>
                </form>
            </div>
            <div className={styles.AddExpenseContainer}>
                <Button onClick={() => setIsModalVisible(true)}>
                    Add New
                </Button>
                {isModalVisible && <Modal>
                    <AddExpense setIsModalVisible={setIsModalVisible}/>
                </Modal>}
            </div>
        </div>
    );
};