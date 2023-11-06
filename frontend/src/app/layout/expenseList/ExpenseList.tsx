import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectExpenses, updateExpenses } from '../../../stores/userModule';
import { Expense } from '../../../types/Expense';
import { ExpenseItem } from '../../components/expense/ExpenseItem';
import { SortedPanel } from '../../components/sortedPanel/SortedPanel';
import { appSettings } from '../../config';
import styles from './ExpenseList.module.scss';
import { Modal } from '../../components/modal/Modal';
import { AddExpense } from '../addExpense/AddExpense';
import Button from '../../components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faFilter } from '@fortawesome/free-solid-svg-icons';

export const ExpenseList = () => {
    
    const [isModalSortedVisible, setIsModalSortedVisible] = useState(false);
    const [isModalAddExpenseVisible, setIsModalAddExpenseVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expenses/expensesByDay/${appSettings.user_id}`)
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

    const expenses: Record<string, Expense[]> = useSelector(selectExpenses);
    const todayDate = new Date().toISOString().split('T')[0]; 
  
    return (
        <div className={styles.ExpenseList}>
            <div className={styles.ButtonsPanel}>
                <h2 className={styles.ButtonsPanelHeader}>Expense List</h2>
                <div className={styles.SortedPanelContainer}>
                    <Button 
                        onClick={() => setIsModalSortedVisible(true)}
                    >
                        <FontAwesomeIcon icon={faFilter} />
                    </Button>
                    {isModalSortedVisible && <Modal>
                        <SortedPanel setIsModalVisible={setIsModalSortedVisible}/>
                    </Modal>}
                </div>
                <div className={styles.AddExpenseContainer}>
                    <Button 
                        onClick={() => setIsModalAddExpenseVisible(true)}
                    >
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </Button>
                    {isModalAddExpenseVisible && <Modal>
                        <AddExpense setIsModalVisible={setIsModalAddExpenseVisible}/>
                    </Modal>}
                </div>
            </div>
            <div className={styles.ExpenseListContainer}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    Object.entries(expenses).map(([date, expensesByDate]) => (
                        <div key={date}>
                          <h3>
                            {date === todayDate ? 'TODAY' : date}
                        </h3>
                          {expensesByDate.map((expense) => (
                            <ExpenseItem
                              key={expense._id}
                              expense={expense}
                            />
                          ))}
                        </div>
                      ))
                )}
            </div>
        </div>
    );
};
