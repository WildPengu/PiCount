import "../i18next";
import { Dispatch, SetStateAction } from "react";
import { ChangeUserPasswordForm } from "../../types/LoginForm";
import { AppSettingsProvider } from "../config";

interface ChangeUserPasswordType {
  validationOldPass: string;
  validationPass1: string;
  validationPass2: string;
  validationPass3: string;
  validationConfPass: string;
}
const { appSettings } = AppSettingsProvider();

export const ChangePasswordValidate = async (
  formData: ChangeUserPasswordForm,
  setErrors: Dispatch<SetStateAction<ChangeUserPasswordForm>>,
  t: any
): Promise<boolean> => {
  let validationErrors = {
    oldPass: false,
    newPass: false,
    confirmNewPass: false,
  };
  console.log(appSettings);
  const {
    validationOldPass,
    validationPass1,
    validationPass2,
    validationPass3,
    validationConfPass,
  } = t("signUpComponent") as unknown as ChangeUserPasswordType;

  //old password validacion
  const url = `${appSettings.apiHost}:${appSettings.apiPort}/${appSettings.user_id}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: formData.oldPass,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.valid) {
      validationErrors.oldPass = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        oldPass: validationOldPass,
      }));
    }
  } catch (error) {
    validationErrors.oldPass = true;
    setErrors((prevErrors) => ({
      ...prevErrors,
      oldPass: validationOldPass,
    }));
    console.error("Błąd weryfikacji starego hasła:", error);
  }

  //new password validation

  if (formData.newPass.trim().length < 6) {
    validationErrors.newPass = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        newPass: validationPass1,
      };
    });
  } else if (!/^[^\s]*$/.test(formData.newPass.trim())) {
    validationErrors.newPass = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        newPass: validationPass2,
      };
    });
  } else if (
    !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.newPass.trim())
  ) {
    validationErrors.newPass = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        newPass: validationPass3,
      };
    });
  }

  //confirm password validation

  if (formData.newPass.trim() !== formData.confirmNewPass.trim()) {
    validationErrors.confirmNewPass = true;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        confirmNewPass: validationConfPass,
      };
    });
  }

  return (
    !validationErrors.oldPass &&
    !validationErrors.newPass &&
    !validationErrors.confirmNewPass
  );
};
