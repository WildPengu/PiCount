import { Dispatch, SetStateAction } from "react";
import { SignUpForm } from "../../types/SignUpForm";


export const Validate = (formData: SignUpForm, setErrors: Dispatch<SetStateAction<SignUpForm>>): boolean => {
    let validationErrors = {
        name: false,
        avatar: false,
        email: false,
        password: false,
        confirmPassword: false,
    };

    //username validation
    if(formData.name.length < 4) {
        validationErrors.name = true;
        setErrors(prevErrors => {
            return {
                ...prevErrors, 
                name: 'User name should have at least 4 characters*'
            };
        });
    };

    //avatar validation

    if(formData.avatar === '') {
        validationErrors.avatar = true;
        setErrors(prevErrors => {
            return {
                ...prevErrors, 
                avatar: 'Please selecte Avatar*'
            };
        });
    };

    //email validation

    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
        validationErrors.email = true;
        setErrors(prevErrors => {
            return {
                ...prevErrors, 
                email: 'There is no valid email*'
            };
        });
    };

    //password validation

    if(formData.password.trim().length < 6){
        validationErrors.password = true;
        setErrors(prevErrors => {
            return {
                ...prevErrors, 
                password: 'Password should have at least 6 characters*',
            };
        });
    } else if(!/^[^\s]*$/.test(formData.password.trim())) {
        validationErrors.password = true;
        setErrors(prevErrors => {
            return {
                ...prevErrors, 
                password: 'Password shouldn`t have empty characters*',
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
    };

    //confirm password validation

    if(formData.password.trim() !== formData.confirmPassword.trim()) {
        validationErrors.confirmPassword = true;
        setErrors(prevErrors => {
            return {
                ...prevErrors, 
                confirmPassword: 'Password should be the same*',
            };
        });
    };

    return(
        !validationErrors.name && 
        !validationErrors.avatar && 
        !validationErrors.email && 
        !validationErrors.password &&
        !validationErrors.confirmPassword
    );
};