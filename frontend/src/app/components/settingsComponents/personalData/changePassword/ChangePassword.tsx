import styles from "./ChangePassword.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../../i18next";
import { AppSettingsProvider } from "../../../../config";
import Button from "../../../button/Button";
import { Color } from "../../../../types/Enums";
import { ChangeUserPasswordForm } from "../../../../../types/LoginForm";
import { ChangePasswordValidate } from "../../../../helpers/ChangePasswordValidate";

export const ChangePassword = () => {
  const { t } = useTranslation();
  const { appSettings } = AppSettingsProvider();

  const [formData, setFormData] = useState<ChangeUserPasswordForm>({
    oldPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const [errors, setErrors] = useState<ChangeUserPasswordForm>({
    oldPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setErrorMessage(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await ChangePasswordValidate(formData, setErrors, t, appSettings);

    if (!isValid) {
      return;
    }
    const url = `${appSettings.apiHost}:${appSettings.apiPort}/${appSettings.user_id}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setFormData({ oldPass: "", newPass: "", confirmNewPass: "" });
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
      setErrorMessage(t("settingsComponent.changePass"));
    }
  };

  return (
    <div className={styles.ChangePasswordContainer}>
      <h3>{t("settingsComponent.changePass")}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='password'
          name='oldPass'
          placeholder={t("settingsComponent.oldPass")}
          onChange={handleInputChange}
          value={formData.oldPass}
          required
        />
        {errors.oldPass && (
          <p className={styles.FormErrors}>{errors.oldPass}</p>
        )}
        <input
          type='password'
          name='newPass'
          placeholder={t("settingsComponent.newPass")}
          onChange={handleInputChange}
          value={formData.newPass}
          required
        />
        {errors.newPass && (
          <p className={styles.FormErrors}>{errors.newPass}</p>
        )}
        <input
          type='password'
          name='confirmNewPass'
          placeholder={t("signUpComponent.confPass")}
          onChange={handleInputChange}
          value={formData.confirmNewPass}
          required
        />
        {errors.confirmNewPass && (
          <p className={styles.FormErrors}>{errors.confirmNewPass}</p>
        )}
        <div className={styles.ButtonsPanel}>
          <Button type='submit'>{t("settingsComponent.change")}</Button>
          <Button
            backgroundColor={Color.gray}
            onClick={() =>
              setFormData({ oldPass: "", newPass: "", confirmNewPass: "" })
            }
          >
            {t("cancel")}
          </Button>
        </div>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};
