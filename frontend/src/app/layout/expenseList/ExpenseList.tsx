import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveUserId, selectExpenses, updateExpenses } from '../../../stores/userModule';
import { Expense } from '../../../types/Expense';
import { ExpenseItem } from '../../components/expense/ExpenseItem';
import { FilterPanel } from '../../components/filterPanel/FilterPanel';
import { AppSettingsProvider } from '../../config';
import styles from './ExpenseList.module.scss';
import { Modal } from '../../components/modal/Modal';
import { AddExpense } from '../addExpense/AddExpense';
import Button from '../../components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { Loader } from '../../components/loader/Loader';

export const ExpenseList = () => {
    
    const [isModalSortedVisible, setIsModalSortedVisible] = useState(false);
    const [isModalAddExpenseVisible, setIsModalAddExpenseVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const [category, setCategory] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    
    const { appSettings } = AppSettingsProvider();

    const activeUserId = useSelector(selectActiveUserId);

    useEffect(() => {
        fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expenses/expensesByDay/${activeUserId}`)
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
    }, [activeUserId]);

    const expenses: Record<string, Expense[]> = useSelector(selectExpenses);
    const todayDate = new Date().toISOString().split('T')[0]; 
  
    return (
        <div className={styles.ExpenseList}>
            <TopPanel headerText="My Expense List">
                <div className={styles.SortedPanelContainer}>
                    <Button 
                        onClick={() => setIsModalSortedVisible(true)}
                    >
                        <FontAwesomeIcon icon={faFilter} />
                    </Button>
                    {isModalSortedVisible && <Modal>
                        <FilterPanel
                            setIsModalVisible={setIsModalSortedVisible}
                            currentCategory={category}
                            currentDateFrom={dateFrom}
                            currentDateTo={dateTo}
                        />
                    </Modal>}
                    <Button 
                        onClick={() => setIsModalAddExpenseVisible(true)}
                    >
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </Button>
                    {isModalAddExpenseVisible && <Modal>
                        <AddExpense setIsModalVisible={setIsModalAddExpenseVisible}/>
                    </Modal>}
                </div>
            </TopPanel>
            <div className={styles.ExpenseListContainer}>
                {loading ? (
                    <Loader />
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
function useAuth(): { appSettings: any; } {
    throw new Error('Function not implemented.');
}

