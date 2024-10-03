import '../i18next';
import { Dispatch, SetStateAction } from 'react';
import { SignUpForm } from '../../types/SignUpForm';

interface SignUpType {
  validationName: string;
  validationEmail: string;
  validationIco: string;
  validationPass1: string;
  validationPass2: string;
  validationPass3: string;
  validationConfPass: string;
}

export const Validate = (
  formData: SignUpForm,
  setErrors: Dispatch<SetStateAction<SignUpForm>>,
  t: any,
): boolean => {
  const validationErrors = {
    name: false,
    avatar: false,
    email: false,
    password: false,
    confirmPassword: false,
  };

  const {
    validationName,
    validationEmail,
    validationIco,
    validationPass1,
    validationPass2,
    validationPass3,
    validationConfPass,
  } = t('signUpComponent') as unknown as SignUpType;

  //username validation
  if (formData.name.length < 4) {
    validationErrors.name = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        name: validationName,
      };
    });
  }

  //avatar validation

  if (formData.avatar === '') {
    validationErrors.avatar = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        avatar: validationIco,
      };
    });
  }

  //email validation

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
    validationErrors.email = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        email: validationEmail,
      };
    });
  }

  //password validation

  if (formData.password.trim().length < 6) {
    validationErrors.password = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        password: validationPass1,
      };
    });
  } else if (!/^[^\s]*$/.test(formData.password.trim())) {
    validationErrors.password = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        password: validationPass2,
      };
    });
  } else if (
    !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())
  ) {
    validationErrors.password = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        password: validationPass3,
      };
    });
  }

  //confirm password validation

  if (formData.password.trim() !== formData.confirmPassword.trim()) {
    validationErrors.confirmPassword = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        confirmPassword: validationConfPass,
      };
    });
  }

  return (
    !validationErrors.name &&
    !validationErrors.avatar &&
    !validationErrors.email &&
    !validationErrors.password &&
    !validationErrors.confirmPassword
  );
};
