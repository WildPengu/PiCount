import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ExpenseItem.module.scss';
import { Expense, ExpensesCategories } from '../../../types/Expense';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faCartShopping, faBagShopping, faUtensils, faCar, faGift, faHouse, faChildren, faHeartPulse, faSpa, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { selectExpensesCategories } from '../../../stores/userModule/selectors';

interface ExpenseItemProps {
    expense: Expense;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
    
    const expenseCategories: ExpensesCategories[] = useSelector(selectExpensesCategories);

    const categoryInfo = expenseCategories.find((category: { name: string; }) => category.name === expense.category);

    return (
        <div className={styles.ExpenseItem}>
            <div className={styles.ExpenseCategory}>
                <div className={styles.ExpenseInfo}>
                    <div 
                        className={styles.ExpenseIco}
                        style={{ backgroundColor: categoryInfo?.color }}
                    >
                        {categoryInfo && (
                            <FontAwesomeIcon
                                icon={categoryInfo.icon}
                            />
                        )}
                    </div>
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
