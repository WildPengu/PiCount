import styles from './SignUp.module.scss';
import { SignUpForm } from '../../../types/SignUpForm';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import { Validate } from '../../helpers/SignUpValidate';
import { appSettings } from '../../config';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

export const SignUp = () => {

    const [formData, setFormData] = useState<SignUpForm>({
        name: '',
        age: 0,
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<SignUpForm>({
        name: '',
        age: 0,
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [signUpDone, setSignUpDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!Validate(formData, setErrors)) {
            return;
        };

        const url = `${appSettings.apiHost}:${appSettings.apiPort}/users`; 
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const data = await response.json();
            setSignUpDone(true);
            setFormData({
                name: '',
                age: 0,
                email: '',
                password: '',
                confirmPassword: '',
            });
        } catch (error) {
            setErrorMessage('Blad!')
            console.error('Błąd pobierania danych:', error);
        }; 
    };

    return (
        <div className={styles.SignUp}>
            <TopPanel headerText="Create Account">
                <div className={styles.TopPanelContainer}>
                    <Link to='/login'>
                        <FontAwesomeIcon icon={faRightToBracket} />
                    </Link>
                    <Link to='/'>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </Link>
                </div>
            </TopPanel>
            {!signUpDone ? <h2>Fill out the fields to create a new user:</h2> : <h2>The user has been created!</h2>}
            {errorMessage && <h2>{errorMessage}</h2>}
            <form 
                className={styles.SignUpForm}
                onSubmit={handleSubmit}
            >
                <input 
                    type='text' 
                    name='name' 
                    placeholder='User name'
                    className={styles.SignUpInput}
                    onChange={handleInputChange}
                />
                {errors.name && <p>{errors.name}</p>}
                <input 
                    type='number' 
                    name='age' 
                    placeholder='User age'
                    min="16" 
                    max="99" 
                    step="1"
                    className={styles.SignUpInput}
                    onChange={handleInputChange}
                />
                <input 
                    type='email' 
                    name='email' 
                    placeholder='User email' 
                    className={styles.SignUpInput}
                    onChange={handleInputChange}
                />
                {errors.email && <p>{errors.email}</p>}
                <input 
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    className={styles.SignUpInput}
                    onChange={handleInputChange}
                />
                {errors.password && <p>{errors.password}</p>}
                <input 
                    type='password' 
                    name='confirmPassword' 
                    placeholder='Confirm Password'
                    className={styles.SignUpInput} 
                    onChange={handleInputChange}
                />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <div className={styles.ButtonsPanel}>
                    <Button type="submit" isDisabled={signUpDone}>
                        SignUp
                    </Button>
                    {signUpDone && <Link to='/login' className={styles.SignUpButton}>Go to login</Link>}
                </div>
            </form>
        </div>
    )
}