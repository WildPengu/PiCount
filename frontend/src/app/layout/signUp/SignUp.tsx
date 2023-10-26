import styles from './SignUp.module.scss';
import { SignUpForm } from '../../../types/SignUpForm';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

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

    const validate = () => {
        let validationErrors = {
            name: false,
            email: false,
            password: false,
            confirmPassword: false,
        };

        if(formData.name.length < 4) {
            validationErrors.name = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    name: 'User name should have at least 4 characters'
                };
            });
        } else if(!/^[^\s]*$/.test(formData.name.trim())) {
            validationErrors.name = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    name: 'User name should`n have empty characters'
                };
            });
        } else {
            validationErrors.name = false;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    name: ''
                };
            });
        };

        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
            validationErrors.email = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    email: 'There is no valid email'
                };
            });
        } else {
            validationErrors.email = false;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    email: ''
                };
            });
        };

        if(formData.password.trim().length < 6){
            validationErrors.password = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    password: 'Password should have at least 6 characters',
                };
            });
        } else if(!/^[^\s]*$/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    password: 'Password shouldn`t have empty characters',
                };
            });
        } else if(!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    password: 'Password must contain one of charts: ! # @ $ %',
                };
            });
        } else {
            validationErrors.password = false;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    password: '',
                };
            });
        };

        if(formData.password.trim() !== formData.confirmPassword.trim()) {
            validationErrors.confirmPassword = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    confirmPassword: 'Password should be the same',
                };
            });
        } else {
            validationErrors.confirmPassword = false;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, 
                    confirmPassword: '',
                };
            });
        }

        return(
            !validationErrors.name && 
            !validationErrors.email && 
            !validationErrors.password &&
            !validationErrors.confirmPassword
        );
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    }; 

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if(!validate()) {
            return
        };

        const url = 'http://localhost:3000/users';
        
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
            console.log('Użytkownik został utworzony:', data);
            setSignUpDone(true);
        } 
        catch (error) {
            setErrorMessage(error.message);
            console.error('Wystąpił błąd podczas tworzenia użytkownika:', error);
        }
    };


    return (
        <div className={styles.SignUp}>
            {!signUpDone ? <h2 className={styles.SignUpMessage}>Fill out the fields to create a new user:</h2> : <h2 className={styles.SignUpMessage}>The user has been created!</h2>}
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
                    <button className={styles.SignUpButton} disabled={signUpDone}>SignUp</button>
                    {signUpDone && <Link to='/login' className={styles.SignUpButton}>Go to login</Link>}
                </div>
            </form>
        </div>
    )
}