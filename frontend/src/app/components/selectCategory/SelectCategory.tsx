import { useEffect, useState } from 'react';
import styles from './Selectcategory.module.scss';

export interface Category {
    _id: string;
    name: string;
}

export const SelectCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]);

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
        <div className={styles.SelectCategory}>
            <label
                htmlFor='typeOfExpense'
                className={styles.CategoryLabel}
            >Category</label>
            <select
                id='typeOfExpense'
                className={styles.CategoryOfExpense}
            >
                {categories.map((category) => (
                <option key={category._id}>{category.name}</option>
                 ))}
            </select>
        </div>
    );
};