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


export const ExpenseList = () => {
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [deletedExpenseIds, setDeletedExpenseIds] = useState<string[]>([]);


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

    const handleExpenseDeleted = (expenseId: string) => {
        setDeletedExpenseIds((prevIds) => [...prevIds, expenseId]);
    };

    const updatedExpenses = expenses.filter(expense => {
        return typeof expense._id === 'string' && !deletedExpenseIds.includes(expense._id);
    });
    
      
    
    return (
        <div className={styles.ExpenseList}>
            <SortedPanel />
            <div className={styles.AddExpenseContainer}>
                <Button 
                    onClick={() => setIsModalVisible(true)}
                >
                    Add New
                </Button>
                {isModalVisible && <Modal>
                    <AddExpense setIsModalVisible={setIsModalVisible}/>
                </Modal>}
            </div>
            <div className={styles.ExpenseListContainer}>
                <h2>Expense List</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    updatedExpenses?.map((expense: Expense) => {
                        return <ExpenseItem
                            expense={expense}
                            key={expense._id}  
                            onExpenseDeleted={handleExpenseDeleted}                     
                        />
                    })
                )}
            </div>
        </div>
    );
};
