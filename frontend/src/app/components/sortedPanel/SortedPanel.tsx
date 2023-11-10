import styles from './SortedPanel.module.scss';
import { SelectCategory } from '../selectCategory/SelectCategory';
import { SelectDate } from '../datePicker/SelectDate';
import { Color } from '../../types/Enums';
import Button from '../button/Button';
import { FormEvent, useState } from 'react';
import { appSettings } from '../../config';
import { useDispatch } from 'react-redux';
import { updateExpenses } from '../../../stores/userModule/actions';

export interface ModalProps {
    setIsModalVisible: (isVisible: boolean) => void;
  }

export const SortedPanel = ({ setIsModalVisible }:ModalProps) => {

    const [category, setCategory] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const dispatch = useDispatch();
    
    const sortedExpenseList = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expenses/${appSettings.user_id}/expenses/${category}`)
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     console.log(data);
            
        //     setIsModalVisible(false);
        //     dispatch(updateExpenses(data));
        // })
        // .catch(error => {
        //     console.error('Błąd pobierania danych:', error);
        // });

        fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expenses/expensesByDateRange/${appSettings.user_id}?startDate=${dateFrom}&endDate=${dateTo}`)
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
            <h2>Sort of</h2>
            <form 
                className={styles.SortedForm}
                onSubmit={sortedExpenseList}
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
                    <Button backgroundColor={Color.blue} >
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