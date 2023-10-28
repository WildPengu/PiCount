import styles from './ExpenseList.module.scss';
import { SortedPanel } from '../../components/sortedPanel/SortedPanel';
import { ExpenseItem } from '../../components/expense/ExpenseItem';
import { appSettings } from '../../config';
import { Expense } from '../../../types/Expense';
import { useEffect, useState } from 'react';
import map from 'lodash/map';


export const ExpenseList = () => {
    const [expenses, setExpenses] = useState<{ [key: string]: Expense }>({});
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expenses/${appSettings.user_id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setExpenses({...data.expenses, ...expenses});
                setLoading(false);
            })
            .catch(error => {
                console.error('Błąd pobierania danych:', error);
                setLoading(false);
            });
    }, []);
    console.log(expenses)
    return (
        <div className={styles.ExpenseList}>
            <SortedPanel />
            <div className={styles.ExpenseListContainer}>
                <h2>Expense List</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    map(expenses, (expense: Expense) => (
                        <ExpenseItem
                            expense={expense}
                            key={expense._id}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
