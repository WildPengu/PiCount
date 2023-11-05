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
    const [activeOption, setActiveOption] = useState<string>('');
    
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

    const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryName = e.target.value;
        setActiveOption(selectedCategoryName);
    };

    useEffect(() => {
      setActiveOption('Shopping');
    }, []);

    useEffect(() => {
      setCategory && setCategory(activeOption);
  }, [activeOption]);
    
    return (
        <div className={styles.SelectCategory}>
            <label
                htmlFor='typeOfExpense'
                className={styles.CategoryLabel}
            >Select category</label>
            <select
                id='typeOfExpense'
                className={styles.CategoryOfExpense}
                onChange={(e) => handleChangeCategory(e)}
                value={activeOption}
            >
                {categories.map((category) => (
                <option 
                  key={category._id} 
                  value={category.name}
                >
                  {category.name}
                </option>
                 ))}
            </select>
        </div>
    );
};