import styles from './ExpenseList.module.scss';
import { SortedPanel } from '../../components/sortedPanel/SortedPanel';
import { ExpenseItem } from '../../components/expense/ExpenseItem';

export const ExpenseList = () => {

    return (
        <div className={styles.ExpenseList}>
            <SortedPanel />
            <div className={styles.ExpenseListContainer}>
                <h2>Expense List</h2>
                <ExpenseItem />
            </div>
        </div>
    )
};