import { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../i18next';
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

export const AddExpense = ({ setIsModalVisible }: ModalProps) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const { appSettings } = AppSettingsProvider();
  const activeUserId = useSelector(selectActiveUserId);
  const { t } = useTranslation();

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) {
      setError(t('addNewExpense.validation1'));
    } else if (parseFloat(value) < 0.01) {
      setError(t('addNewExpense.validation2'));
    } else {
      setError('');
    }
    setAmount(value);
  };

  const addExpense = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category || !amount || !date) {
      setError(t('addNewExpense.validation3'));
    }

    const newExpense = {
      date: new Date(date).toISOString(),
      category: category,
      amount: parseFloat(amount),
      desc: description,
    };

    fetch(
      `${appSettings.apiHost}:${appSettings.apiPort}/expenses/${activeUserId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCategory('');
        setDescription('');
        setDate('');
        setAmount('');
        setIsModalVisible(false);
        dispatch(updateExpenses(data));
      })
      .catch((error) => {
        console.error('Błąd pobierania danych:', error);
      });
  };

  return (
    <div className={styles.AddExpense}>
      <h2 className={styles.AddExpenseH2} data-testid="add-expense-h2">
        {t('addNewExpense.addNewEx')}
      </h2>
      <form className={styles.FormAddExpense} onSubmit={addExpense}>
        <SelectCategory setCategory={setCategory} t={t} />
        <label htmlFor="desc" className={styles.FormAddExpenseLabel}>
          {t('addNewExpense.desc')}
        </label>
        <textarea
          id="desc"
          name="desc"
          placeholder={t('addNewExpense.descPlaceholder')}
          className={styles.FormAddExpenseTextarea}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
            setDescription(e.target.value)
          }
        ></textarea>
        <SelectDate setDate={setDate} t={t} />
        <div className={styles.AmountContainer}>
          <input
            id="amount"
            name="amount"
            type="number"
            min={0.01}
            step={0.01}
            className={styles.AmountInput}
            placeholder={t('addNewExpense.amount')}
            value={amount}
            onChange={handleAmountChange}
          />
          <select id="currency" className={styles.TypeOfCurrency}>
            <option>PLN</option>
          </select>
        </div>
        {error && <p className={styles.ErrorMessage}>{error}</p>}
        <div className={styles.ButtonsPanel}>
          <Button type="submit">{t('addNewExpense.addEx')}</Button>
          <Button
            backgroundColor={Color.gray}
            onClick={() => setIsModalVisible(false)}
          >
            {t('cancel')}
          </Button>
        </div>
      </form>
    </div>
  );
};
