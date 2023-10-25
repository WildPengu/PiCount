import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../../stores/userModule';
import Button from '../../components/button/Button';
import styles from './AddExpense.module.scss';
import { ButtonBgColor } from '../../components/button/Button';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';


interface Category {
  _id: string;
  name: string;
}

export const AddExpense = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const players = useSelector(selectUsers);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  console.log(players);

  const handleAmountChange = (e: { target: { value: any; }; }) => {
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

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:3000/expensesCategories');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchCategories();
  }, []);


  return (
    <div className={styles.AddExpense}>
      <div className={styles.FormContainer}>
        <h2 className={styles.FormHeader}>Add New Expense</h2>
        <form className={styles.FormAddExpense}>
          <label
            htmlFor='typeOfExpense'
            className={styles.FormAddExpenseLabel}
          >Category</label>
          <select
            id='typeOfExpense'
            className={styles.TypeOfExpense}
          >
            {categories.map((category) => (
              <option key={category._id}>{category.name}</option>
            ))}
          </select>
          <label htmlFor='desc' className={styles.FormAddExpenseLabel}>Description</label>
          <textarea
            id='desc'
            name='desc'
            placeholder='Type...'
            className={styles.FormAddExpenseTextarea}
          ></textarea>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker defaultValue={dayjs(Date())} />
          </LocalizationProvider>
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
            <select id='currency' className={styles.TypeOfCurrency}>
              <option>PLN</option>
            </select>
          </div>
          {error && <p className={styles.ErrorMessage}>{error}</p>}
        </form>
        <div className={styles.ButtonsPanel}>
            <Button>
              Add expense
            </Button>
            <Button backgroundColor={ButtonBgColor.gray}>
              Cancel
            </Button>
          </div>
      </div>
    </div>
  );
};