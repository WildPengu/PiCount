import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ExpenseItem.module.scss';
import { Expense, ExpensesCategories } from '../../../types/Expense';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faCartShopping, faBagShopping, faUtensils, faCar, faGift, faHouse, faChildren, faHeartPulse, faSpa, faDollarSign, faTrashCan, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { selectExpensesCategories } from '../../../stores/userModule/selectors';
import { AppSettingsProvider } from '../../config';
import { updateExpenses } from '../../../stores/userModule/actions';

interface ExpenseItemProps {
    expense: Expense;
}

interface IconMappings {
    [key: string]: IconDefinition;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
    
    const expensesCategories: ExpensesCategories[] = useSelector(selectExpensesCategories);
    const { appSettings } = AppSettingsProvider();
    const categoryInfo = expensesCategories.find((category: { name: string; }) => category.name === expense.category);
    const dispatch = useDispatch();
    
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
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
                return response.json();
            })
            .then(data => {
                dispatch(updateExpenses(data));
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
                    <p className={styles.Category} style={{ color: categoryInfo?.color }}>{expense.category}</p>
                </div>
                <div className={styles.ExpenseAmount}>
                    <p>- <span>{expense.amount}</span> ZŁ</p>
                </div>
            </div>
            <div className={styles.ExpenseDesc}>
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
