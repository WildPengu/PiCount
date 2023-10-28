import styles from './ExpenseItem.module.scss';
import icon from '../../components/appNav/avatar-pikachu-1.jpg';
import { Expense } from '../../../types/Expense';
import dayjs from 'dayjs';

interface ExpenseItemProps {
    expense: Expense;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {

    return (
        <div className={styles.ExpenseItem}>
            <div className={styles.ExpenseCategory}>
                <div className={styles.ExpenseInfo}>
                    <img
                        className={styles.ExpenseIco}
                        src={icon}
                    />
                    <p className={styles.Category}>{expense.category}</p>
                </div>
                <div className={styles.ExpenseAmount}>
                    <p>- <span>{expense.amount}</span> PLN</p>
                </div>
            </div>
            <div className={styles.ExpenseDesc}>
                <p className={styles.ExpenseDate}>
                    {dayjs(expense.date).format('YYYY-MM-DD')}
                </p>
                <p className={styles.Description}>
                    {expense.desc}
                </p>
            </div>
        </div>
    );
};