import "../i18next";
import { Dispatch, SetStateAction } from "react";
import { ChangeUserPasswordForm } from "../../types/LoginForm";

interface ChangeUserPasswordType {
  validationOldPass: string;
  validationNewPass: string;
  validationConfirmNewPass: string;
}

export const ChangePasswordValidate = (
  formData: ChangeUserPasswordForm,
  setErrors: Dispatch<SetStateAction<ChangeUserPasswordForm>>,
  t: any
): boolean => {
  let validationErrors = {
    oldPass: false,
    newPass: false,
    confirmNewPass: false,
  };

  const { validationOldPass, validationNewPass, validationConfirmNewPass } = t(
    "signUpComponent"
  ) as unknown as ChangeUserPasswordType;

  //password validation

  if (formData.newPass.trim().length < 6) {
    validationErrors.newPass = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        password: validationNewPass,
      };
    });
  } else if (!/^[^\s]*$/.test(formData.newPass.trim())) {
    validationErrors.newPass = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        password: validationNewPass,
      };
    });
  } else if (
    !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.newPass.trim())
  ) {
    validationErrors.newPass = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        password: validationNewPass,
      };
    });
  }

  //confirm password validation

  if (formData.newPass.trim() !== formData.confirmNewPass.trim()) {
    validationErrors.confirmNewPass = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        confirmPassword: validationConfirmNewPass,
      };
    });
  }

  return !validationErrors.newPass && !validationErrors.confirmNewPass;
};
