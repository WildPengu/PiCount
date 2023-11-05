import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ExpenseItem.module.scss';
import { Expense, ExpensesCategories } from '../../../types/Expense';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faCartShopping, faBagShopping, faUtensils, faCar, faGift, faHouse, faChildren, faHeartPulse, faSpa, faDollarSign, faTrashCan, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { selectExpensesCategories } from '../../../stores/userModule/selectors';
import { appSettings } from '../../config';

interface ExpenseItemProps {
    expense: Expense;
}

interface IconMappings {
    [key: string]: IconDefinition;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
    
    const expensesCategories: ExpensesCategories[] = useSelector(selectExpensesCategories);

    const categoryInfo = expensesCategories.find((category: { name: string; }) => category.name === expense.category);
    
    const iconMappings: IconMappings = {
        faPaw: faPaw,
        faCartShopping: faCartShopping,
        faBagShopping: faBagShopping,
        faUtensils: faUtensils,
        faCar: faCar,
        faGift: faGift,
        faHouse: faHouse,
        faChildren: faChildren,
        faHeartPulse: faHeartPulse,
        faSpa: faSpa,
        faDollarSign: faDollarSign,
    };

    const selectedIcon = categoryInfo?.image ? iconMappings[categoryInfo.image] : undefined;

    const handleDeleteExpense = () => {
        fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expenses/${appSettings.user_id}/expenses/${expense._id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json', 
            },
          })
            .then(response => {
              if (response.ok) {
                // onExpenseDeleted(expense._id);
                console.log('Wydatek został usunięty.');
              } else {
                console.error('Błąd podczas usuwania wydatku.');
              }
            })
            .catch(error => {
              console.error('Wystąpił błąd sieci:', error);
            });
    }


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
                                icon={selectedIcon || faDollarSign}
                                color='white'
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
                <div 
                    className={styles.DeleteButtonContainer} 
                    onClick={handleDeleteExpense}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>
            </div>
        </div>
    );
};
