import { faCirclePlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveUserId,
  selectExpenses,
  updateExpenses,
} from '../../../stores/userModule';
import { Expense } from '../../../types/Expense';
import { AddExpense } from '../../components/addExpense/AddExpense';
import Button from '../../components/button/Button';
import { ExpenseItem } from '../../components/expense/ExpenseItem';
import { FilterPanel } from '../../components/filterPanel/FilterPanel';
import { Loader } from '../../components/loader/Loader';
import { Modal } from '../../components/modal/Modal';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { AppSettingsProvider } from '../../config';
import '../../i18next';
import { Color } from '../../types/Enums';
import styles from './ExpenseList.module.scss';

export const ExpenseList = () => {
  const [isModalFilterVisible, setIsModalFilterVisible] = useState(false);
  const [isModalAddExpenseVisible, setIsModalAddExpenseVisible] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [error, setError] = useState<string>('');

  const { appSettings } = AppSettingsProvider();
  const activeUserId = useSelector(selectActiveUserId);

  useEffect(() => {
    fetch(
      `${appSettings.apiHost}:${appSettings.apiPort}/expenses/expensesByDay/${activeUserId}`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        dispatch(updateExpenses(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Błąd pobierania danych:', error);
        setLoading(false);
      });
  }, [activeUserId, appSettings.apiHost, appSettings.apiPort, dispatch]);

  const expenses: Record<string, Expense[]> = useSelector(selectExpenses);
  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.ExpenseList}>
      <TopPanel headerText={t('expList')}>
        <div className={styles.TopPanelContainer}>
          <Button
            backgroundColor={Color.transparent}
            onClick={() => setIsModalFilterVisible(!isModalFilterVisible)}
            dataTestId="filter-btn"
          >
            <FontAwesomeIcon icon={faFilter} />
          </Button>
          {isModalFilterVisible && (
            <Modal>
              <FilterPanel
                setIsModalVisible={setIsModalFilterVisible}
                setError={setError}
              />
            </Modal>
          )}
          <Button
            backgroundColor={Color.transparent}
            onClick={() =>
              setIsModalAddExpenseVisible(!isModalAddExpenseVisible)
            }
            dataTestId="add-expense-btn"
          >
            <FontAwesomeIcon icon={faCirclePlus} />
          </Button>
          {isModalAddExpenseVisible && (
            <Modal>
              <AddExpense setIsModalVisible={setIsModalAddExpenseVisible} />
            </Modal>
          )}
        </div>
      </TopPanel>
      <div className={styles.ExpenseListContainer}>
        <h3 className={styles.ErrorText}>{error}</h3>
        {loading ? (
          <Loader />
        ) : (
          Object.entries(expenses).map(([date, expensesByDate]) => (
            <div key={date}>
              <h3>{date === todayDate ? t('today') : date}</h3>
              {expensesByDate.map((expense) => (
                <ExpenseItem key={expense._id} expense={expense} />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
