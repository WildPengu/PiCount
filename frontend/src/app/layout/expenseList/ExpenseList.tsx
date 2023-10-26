import { useState } from 'react';
import { Modal } from '../../components/modal/Modal';
import { AddExpense } from '../addExpense/AddExpense';
import styles from './ExpenseList.module.scss';
import Button from '../../components/button/Button';

export const ExpenseList = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div className={styles.ExpenseList}>
            <Button onClick={() => setIsModalVisible(true)}>
              +
            </Button>
            {isModalVisible && <Modal>
                <AddExpense setIsModalVisible={setIsModalVisible}/>
            </Modal>}
        </div>
    )
};