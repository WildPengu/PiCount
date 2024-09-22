import styles from "./ChangePassword.module.scss";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../../i18next";
import Button from "../../../button/Button";
import { Color } from "../../../../types/Enums";
import { ChangeUserPasswordForm } from "../../../../../types/LoginForm";
import { ChangePasswordValidate } from "../../../../helpers/ChangePasswordValidate";

export const ChangePassword = () => {
  const { t } = useTranslation();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!ChangePasswordValidate(formData, setErrors, t)) {
      return;
    }
  };

  return (
    <div className={styles.ChangePasswordContainer}>
      <h3>{t("settingsComponent.changePass")}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='password'
          name='oldPassword'
          placeholder={t("settingsComponent.oldPass")}
          value={formData.oldPass}
        />
        {errors.oldPass && (
          <p className={styles.FormErrors}>{errors.oldPass}</p>
        )}
        <input
          type='password'
          name='newPassword'
          placeholder={t("settingsComponent.newPass")}
          value={formData.newPass}
        />
        {errors.newPass && (
          <p className={styles.FormErrors}>{errors.newPass}</p>
        )}
        <input
          type='password'
          name='confirmPassword'
          placeholder={t("signUpComponent.confPass")}
          value={formData.confirmNewPass}
        />
        {errors.confirmNewPass && (
          <p className={styles.FormErrors}>{errors.confirmNewPass}</p>
        )}
        <div className={styles.ButtonsPanel}>
          <Button type='submit'>{t("settingsComponent.change")}</Button>
          <Button backgroundColor={Color.gray}>{t("cancel")}</Button>
        </div>
      </form>
    </div>
  );
};
