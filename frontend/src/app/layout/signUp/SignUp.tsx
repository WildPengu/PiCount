import {
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SignUpForm } from "../../../types/SignUpForm";
import { AvatarGallery } from "../../components/avatarGallery/AvatarGallery";
import Button from "../../components/button/Button";
import { TopPanel } from "../../components/topPanel/TopPanel";
import { AppSettingsProvider } from "../../config";
import { Validate } from "../../helpers/SignUpValidate";
import "../../i18next";
import styles from "./SignUp.module.scss";

import ash from "../../img/avatarsImage/ash-with-pikachu.png";
import bulbasaur from "../../img/avatarsImage/bulbasaur-avatar.jpg";
import charizard from "../../img/avatarsImage/charizard-avatar.jpg";
import charmander from "../../img/avatarsImage/charmander-avatar.png";
import eeve from "../../img/avatarsImage/eeve-avatar.jpg";
import jigglypuff from "../../img/avatarsImage/jigglypuff-avatar.jpg";
import logo from "../../img/avatarsImage/logo-pikachu.jpg";
import piplup from "../../img/avatarsImage/piplup-avatar.png";
import piplup2 from "../../img/avatarsImage/piplup-avatar2.jpg";
import squirtle2 from "../../img/avatarsImage/squirtle-avatar-glass.jpg";
import squirtle from "../../img/avatarsImage/squirtle-avatar.jpg";

export const SignUp = () => {
  const { appSettings } = AppSettingsProvider();
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const { t } = useTranslation();

  const [formData, setFormData] = useState<SignUpForm>({
    name: "",
    age: null,
    email: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<SignUpForm>({
    name: "",
    age: null,
    email: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });

  const [signUpDone, setSignUpDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setFormData({
      ...formData,
      avatar: avatar,
    });
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        avatar: "",
      };
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [name]: "",
      };
    });
    setErrorMessage(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!Validate(formData, setErrors, t)) {
      return;
    }

    const url = `${appSettings.apiHost}:${appSettings.apiPort}/users`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSignUpDone(true);
      setFormData({
        name: "",
        age: null,
        email: "",
        avatar: "",
        password: "",
        confirmPassword: "",
      });
      setSelectedAvatar("");
    } catch (error) {
      setErrorMessage(t("signUpComponent.validationNameAndEmail"));
      console.error("Błąd pobierania danych:", error);
    }
  };

  return (
    <div className={styles.SignUp}>
      <TopPanel headerText={t("signUpComponent.create")}>
        <div className={styles.TopPanelContainer}>
          <Link to='/login'>
            <FontAwesomeIcon icon={faRightToBracket} />
          </Link>
          <Link to='/'>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Link>
        </div>
      </TopPanel>
      <h2
        className={signUpDone ? styles.SignUpNewUser : ""}
        data-testid='welcome-message'
      >
        {signUpDone ? t("signUpComponent.welcome") : t("signUpComponent.desc")}
      </h2>
      {errorMessage && <h2 className={styles.SignUpErrors}>{errorMessage}</h2>}
      <form className={styles.SignUpForm} onSubmit={handleSubmit}>
        <input
          data-testid="sign-up-username"
          type='text'
          name='name'
          placeholder={t("signUpComponent.username")}
          className={styles.SignUpInput}
          onChange={handleInputChange}
          value={formData.name}
        />
        {errors.name && (
          <p className={styles.SignUpErrors} data-testid='username-error'>
            {errors.name}
          </p>
        )}
        <input
          data-testid="sign-up-age"
          type='number'
          name='age'
          placeholder={t("signUpComponent.userAge")}
          min='16'
          max='99'
          step='1'
          className={styles.SignUpInput}
          onChange={handleInputChange}
          value={formData.age !== null ? formData.age : ""}
        />
        <AvatarGallery
          avatars={[
            logo,
            eeve,
            charizard,
            bulbasaur,
            charmander,
            jigglypuff,
            piplup,
            squirtle,
            squirtle2,
            ash,
            piplup2,
          ]}
          onAvatarSelect={handleAvatarSelect}
          selectedAvatar={formData.avatar}
        />
        {errors.avatar && (
          <p className={styles.SignUpErrors} data-testid='avatar-error'>
            {errors.avatar}
          </p>
        )}
        <input
          data-testid='sign-up-email'
          type='email'
          name='email'
          placeholder={t("signUpComponent.userEmail")}
          className={styles.SignUpInput}
          onChange={handleInputChange}
          value={formData.email}
        />
        {errors.email && (
          <p className={styles.SignUpErrors} data-testid='email-error'>
            {errors.email}
          </p>
        )}
        <input
          data-testid='sign-up-password'
          type='password'
          name='password'
          placeholder={t("signUpComponent.userPass")}
          className={styles.SignUpInput}
          onChange={handleInputChange}
          value={formData.password}
        />
        {errors.password && (
          <p className={styles.SignUpErrors} data-testid='password-error'>
            {errors.password}
          </p>
        )}
        <input
          data-testid='sign-up-password-confirm'
          type='password'
          name='confirmPassword'
          placeholder={t("signUpComponent.confPass")}
          className={styles.SignUpInput}
          onChange={handleInputChange}
          value={formData.confirmPassword}
        />
        {errors.confirmPassword && (
          <p
            className={styles.SignUpErrors}
            data-testid='confirm-password-error'
          >
            {errors.confirmPassword}
          </p>
        )}
        <div className={styles.ButtonsPanel}>
          <Button
            dataTestId="sign-up-submit"
            type='submit'
            isDisabled={signUpDone}
          >
            {t("signUpComponent.signUp")}
          </Button>
          {signUpDone && (
            <Link
              to='/login'
              className={styles.SignUpButton}
              data-testid='link-to-login'
            >
              {t("signUpComponent.goToLogin")}
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};
