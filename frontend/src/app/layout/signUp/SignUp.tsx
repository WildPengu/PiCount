import styles from './SignUp.module.scss';
import { SignUpForm } from '../../../types/SignUpForm';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import { Validate } from '../../helpers/SignUpValidate';
import { AppSettingsProvider } from '../../config';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { AvatarGallery } from '../../components/avatarGallery/AvatarGallery';

import eeve from '../../img/avatarsImage/eeve-avatar.jpg';
import charizard from '../../img/avatarsImage/charizard-avatar.jpg';
import bulbasaur from '../../img/avatarsImage/bulbasaur-avatar.jpg';
import charmander from '../../img/avatarsImage/charmander-avatar.png';
import jigglypuff from '../../img/avatarsImage/jigglypuff-avatar.jpg';
import piplup from '../../img/avatarsImage/piplup-avatar.png';
import piplup2 from '../../img/avatarsImage/piplup-avatar2.jpg';
import squirtle from '../../img/avatarsImage/squirtle-avatar.jpg';
import squirtle2 from '../../img/avatarsImage/squirtle-avatar-glass.jpg';
import logo from '../../img/avatarsImage/logo-pikachu.jpg';
import ash from '../../img/avatarsImage/ash-with-pikachu.png';

export const SignUp = () => {

    const { appSettings } = AppSettingsProvider();
    const [selectedAvatar, setSelectedAvatar] = useState<string>('');
    

    const [formData, setFormData] = useState<SignUpForm>({
        name: '',
        age: null,
        email: '',
        avatar: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<SignUpForm>({
        name: '',
        age: null,
        email: '',
        avatar: '',
        password: '',
        confirmPassword: '',
    });
    
    const [signUpDone, setSignUpDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAvatarSelect = (avatar: string) => {
        setSelectedAvatar(avatar); 
        setFormData({
            ...formData,
            avatar: avatar,
        });
        setErrors(prevErrors => {
            return {
                ...prevErrors, 
                avatar: ''
            };
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        setErrors(prevErrors => {
            return {
                ...prevErrors, 
                [name]: ''
            };
        });
        setErrorMessage('');
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
                age: null,
                email: '',
                avatar: '',
                password: '',
                confirmPassword: '',
            });
            setSelectedAvatar(''); 
        } catch (error) {
            setErrorMessage('Username or email has been used')
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
            {errorMessage && <h2 className={styles.SignUpErrors}>{errorMessage}</h2>}
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
                    value={formData.name}
                />
                {errors.name && <p className={styles.SignUpErrors}>{errors.name}</p>}
                <input 
                    type='number' 
                    name='age' 
                    placeholder='User age'
                    min="16" 
                    max="99" 
                    step="1"
                    className={styles.SignUpInput}
                    onChange={handleInputChange}
                    value={formData.age !== null ? formData.age : ''}
                />
                <AvatarGallery 
                    avatars={[logo, eeve, charizard, bulbasaur, charmander, jigglypuff, piplup, squirtle, squirtle2, ash, piplup2]} onAvatarSelect={handleAvatarSelect} 
                    selectedAvatar={formData.avatar}
                />
                {errors.avatar && <p className={styles.SignUpErrors}>{errors.avatar}</p>}
                <input 
                    type='email' 
                    name='email' 
                    placeholder='User email' 
                    className={styles.SignUpInput}
                    onChange={handleInputChange}
                    value={formData.email}
                />
                {errors.email && <p className={styles.SignUpErrors}>{errors.email}</p>}
                <input 
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    className={styles.SignUpInput}
                    onChange={handleInputChange}
                    value={formData.password}
                />
                {errors.password && <p className={styles.SignUpErrors}>{errors.password}</p>}
                <input 
                    type='password' 
                    name='confirmPassword' 
                    placeholder='Confirm Password'
                    className={styles.SignUpInput} 
                    onChange={handleInputChange}
                    value={formData.confirmPassword}
                />
                {errors.confirmPassword && <p className={styles.SignUpErrors}>{errors.confirmPassword}</p>}
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