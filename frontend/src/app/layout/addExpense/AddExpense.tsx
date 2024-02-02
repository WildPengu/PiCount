import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../../components/button/Button';
import styles from './AddExpense.module.scss';
import { SelectCategory } from '../../components/selectCategory/SelectCategory';
import { SelectDate } from '../../components/datePicker/SelectDate';
import { Color } from '../../types/Enums';
import { AppSettingsProvider } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpenses } from '../../../stores/userModule/actions';
import { selectActiveUserId } from '../../../stores/userModule';

export interface ModalProps {
  setIsModalVisible: (isVisible: boolean) => void;
}

export const AddExpense = ({ setIsModalVisible }:ModalProps ) => {

  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const { appSettings } = AppSettingsProvider();
  const activeUserId = useSelector(selectActiveUserId);
  
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!value) {
      setError('Amount is required');
    } else if (parseFloat(value) < 0.01) {
      setError('Amount must be greater than 0.');
    } else {
      setError('');
    }
    setAmount(value);
  };

  const addExpense = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!category || !amount || !date) {
      setError('Category of Expense, Date and Amount are required!');
    }

    const newExpense = {
      date: new Date(date).toISOString(),
      category: category,
      amount: parseFloat(amount),
      desc: description,
    };

    fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expenses/${activeUserId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
      
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
        return response.json();
      })
      .then(data => {
        
        setCategory('');
        setDescription('');
        setDate('');
        setAmount('');
        setIsModalVisible(false);
        dispatch(updateExpenses(data));
      })
      .catch(error => {
          console.error('Błąd pobierania danych:', error);
      });  
  };

  return (
      <div className={styles.AddExpense}>
        <h2 className={styles.AddExpenseH2}>Add New Expense</h2>
        <form 
          className={styles.FormAddExpense}
          onSubmit={addExpense}
        >
          <SelectCategory setCategory={setCategory}/>
          <label 
            htmlFor='desc' 
            className={styles.FormAddExpenseLabel}
          >
            Description
          </label>
          <textarea
            id='desc'
            name='desc'
            placeholder='Type...'
            className={styles.FormAddExpenseTextarea}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => setDescription(e.target.value)}
          ></textarea>
          <SelectDate setDate={setDate}/>
          <div className={styles.AmountContainer}>
            <input
              id='amount'
              name='amount'
              type='number'
              min={0.01}
              step={0.01}
              className={styles.AmountInput}
              placeholder='Amount'
              value={amount}
              onChange={handleAmountChange}
            />
            <select 
              id='currency' 
              className={styles.TypeOfCurrency}
            >
              <option>PLN</option>
            </select>
          </div>
          {error && <p className={styles.ErrorMessage}>{error}</p>}
          <div className={styles.ButtonsPanel}>
            <Button type='submit'>
              Add expense
            </Button>
            <Button backgroundColor={Color.gray} onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
  );
};