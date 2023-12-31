import styles from './FilterPanel.module.scss';
import { SelectCategory } from '../selectCategory/SelectCategory';
import { SelectDate } from '../datePicker/SelectDate';
import { Color } from '../../types/Enums';
import Button from '../button/Button';
import { FormEvent, useState } from 'react';
import { AppSettingsProvider } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpenses } from '../../../stores/userModule/actions';
import { selectActiveUserId } from '../../../stores/userModule';

export interface ModalProps {
    setIsModalVisible: (isVisible: boolean) => void;
}

export interface FilterPanelProps extends ModalProps {
    currentCategory?: string;
    currentDateFrom?: string;
    currentDateTo?: string;
}

export const FilterPanel = ({
    setIsModalVisible,
    currentCategory,
    currentDateFrom,
    currentDateTo,
}:FilterPanelProps) => {

    const [category, setCategory] = useState(currentCategory);
    const [dateFrom, setDateFrom] = useState(currentDateFrom);
    const [dateTo, setDateTo] = useState(currentDateTo);

    const { appSettings } = AppSettingsProvider();
    const activeUserId = useSelector(selectActiveUserId);
    const dispatch = useDispatch();

    const resetFilters = () => {
        fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expenses/expensesByDay/${activeUserId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setCategory('');
            setDateFrom('');
            setDateTo('');
            setIsModalVisible(false);
            dispatch(updateExpenses(data));
        })
        .catch(error => {
            console.error('Błąd pobierania danych:', error);
        });
    };
    
    const filteredExpenseList = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expenses/expensesByDateRange/${activeUserId}?startDate=${dateFrom}&endDate=${dateTo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setIsModalVisible(false);
            dispatch(updateExpenses(data));
        })
        .catch(error => {
            console.error('Błąd pobierania danych:', error);
        });
    };
    
    return (
        <div className={styles.SortedPanel}>
            <h2>Filter</h2>
            <form 
                className={styles.SortedForm}
                onSubmit={filteredExpenseList}
            >
                <div className={styles.SortedPanelContainer}>
                    <SelectCategory setCategory={setCategory}/>
                    <SelectDate label='From' setDate={setDateFrom}/>
                    <SelectDate label='To' setDate={setDateTo}/>
                </div>
                <div className={styles.ButtonsPanel}>
                    <Button type='submit'>
                        Filter
                    </Button>
                    <Button backgroundColor={Color.blue} onClick={resetFilters}>
                        Reset
                    </Button>
                    <Button backgroundColor={Color.gray} onClick={() => setIsModalVisible(false)}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};