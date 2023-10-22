import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectUsers } from '../../stores/userModule';
import Button from '../components/button/Button';
import styles from './AddExpense.module.scss';

interface Category {
  _id: string;
  name: string;
}

const AddExpense = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const players = useSelector(selectUsers);
  console.log(players);

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
        <form className={styles.FormAddExpense}>
          <label htmlFor='typeOfExpense' className={styles.FormAddExpenseLabel}>Type</label>
          <select id='typeOfExpense' className={styles.TypeOfExpense}>
            {categories.map((category) => (
              <option key={category._id}>{category.name}</option>
            ))}
          </select>
          <label htmlFor='desc' className={styles.FormAddExpenseLabel}>Description</label>
          <textarea id='desc' name='desc' placeholder='Type...' className={styles.FormAddExpenseTextarea}></textarea>
          <div className={styles.AmountContainer}>
            <label htmlFor='amount' className={styles.AmountLabel}>Amount</label>
            <input id='amount' name='amount' type='number' className={styles.AmountInput} />
            <select id='currency' className={styles.TypeOfCurrency}>
              <option>PLN</option>
            </select>
          </div>
          <Button>
            Add expense
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;