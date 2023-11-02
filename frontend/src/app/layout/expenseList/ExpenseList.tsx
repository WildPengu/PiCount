import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectExpenses, updateExpenses } from '../../../stores/userModule';
import { Expense } from '../../../types/Expense';
import { ExpenseItem } from '../../components/expense/ExpenseItem';
import { SortedPanel } from '../../components/sortedPanel/SortedPanel';
import { appSettings } from '../../config';
import styles from './ExpenseList.module.scss';


export const ExpenseList = () => {
    
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expenses/${appSettings.user_id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                dispatch(updateExpenses(data));
                setLoading(false);
            })
            .catch(error => {
                console.error('Błąd pobierania danych:', error);
                setLoading(false);
            });
    }, []);

    const expenses: Expense[] = useSelector(selectExpenses);
    
    return (
        <div className={styles.ExpenseList}>
            <SortedPanel />
            <div className={styles.ExpenseListContainer}>
                <h2>Expense List</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    expenses?.map((expense: Expense) => {
                        return <ExpenseItem
                            expense={expense}
                            key={expense._id}                       
                        />
                    })
                )}
            </div>
        </div>
    );
};
