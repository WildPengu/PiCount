import { ChangeEvent, useEffect, useState } from 'react';
import styles from './Selectcategory.module.scss';
import { appSettings } from '../../config';

export interface Category {
    _id: string;
    name: string;
}

export interface SelectCategoryProps {
  setCategory?: (category: string) => void;
}

export const SelectCategory = ({ setCategory }: SelectCategoryProps) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function fetchCategories() {
          try {
            const response = await fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expensesCategories`);
    
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
        <div className={styles.SelectCategory}>
            <label
                htmlFor='typeOfExpense'
                className={styles.CategoryLabel}
            >Category</label>
            <select
                id='typeOfExpense'
                className={styles.CategoryOfExpense}
                onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
                  if (setCategory) {
                      setCategory(e.target.value);
                  }
              }}
            >
                {categories.map((category) => (
                <option key={category._id}>{category.name}</option>
                 ))}
            </select>
        </div>
    );
};