import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../../stores/userModule';
import Button from '../../components/button/Button';
import styles from './AddExpense.module.scss';
import { SelectCategory } from '../../components/selectCategory/SelectCategory';
import { SelectDate } from '../../components/datePicker/SelectDate';
import { Color } from '../../types/Enums';

export interface ModalProps {
  setIsModalVisible: (isVisible: boolean) => void;
}

export const AddExpense = ({ setIsModalVisible }:ModalProps ) => {
 
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

  return (
      <div className={styles.AddExpense}>
        <h2>Add New Expense</h2>
        <form className={styles.FormAddExpense}>
          <SelectCategory />
          <label htmlFor='desc' className={styles.FormAddExpenseLabel}>Description</label>
          <textarea
            id='desc'
            name='desc'
            placeholder='Type...'
            className={styles.FormAddExpenseTextarea}
          ></textarea>
          <SelectDate />
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
            <Button backgroundColor={Color.gray} onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
          </div>
      </div>
  );
};