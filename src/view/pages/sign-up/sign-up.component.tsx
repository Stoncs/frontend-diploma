import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import axios, { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// ДОПИСАТЬ ВАЛИДАЦИЮ НОРМАЛЬНО
import styles from "./sign-up.style.scss";

import { LOGIN_ROUTE } from "~/utils/consts";
import InputRegister from "~/view/components/inputRegister/inputRegister.component";

type IFormInputs = {
  email: string;
  phone: string;
  fullName: string;
  organisation: string;
  password: string;
  repeatPassword: string;
};

export default function SingUp() {
  const intl = useIntl();
  // placeholders
  const phoneString = intl.formatMessage({ id: "phone" });
  const emailString = intl.formatMessage({ id: "email" });
  const fullNameString = intl.formatMessage({ id: "fullName" });
  const organisationString = intl.formatMessage({ id: "organisation" });
  const passwordString = intl.formatMessage({ id: "password" });
  const repeatPasswordString = intl.formatMessage({ id: "repeatPassword" });

  const phoneRegExp =
    /^(8|\+7)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

  // Валидация формы
  // !! Для телефона - если пустая строка, то выводит ошибку
  const schema = yup.object({
    email: yup
      .string()
      .required("errFieldRequired")
      .email("errEmailIncorrect")
      .matches(
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "errEmailIncorrect"
      ),
    phone: yup
      .string()
      .matches(phoneRegExp, "errPhoneIncorrect")
      .max(12, "errPhoneMaxLength"),

    fullname: yup.string(),
    organisation: yup.string(),
    password: yup.string().min(6, "errPasswordMinLength"),
    repeatPassword: yup
      .string()
      .required("errFieldRequired")
      .oneOf([yup.ref("password")], "errRepeatPassword"),
  });

  // Хук для валидации формы
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // Метод для отправки формы
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      await axios.post<IFormInputs>("http://localhost:8080/api/auth/signup", {
        username: data.email,
        phoneNumber: data.phone,
        fullname: data.fullName,
        password: data.password,
        organisation: data.organisation,
      });
      navigate(LOGIN_ROUTE);
    } catch (error) {
      if (error instanceof AxiosError) {
        // eslint-disable-next-line no-console
        alert(error);
        console.log(error.response?.data.message);
        // ... дописать, что проверку не прошло
      } else {
        console.log("Unexpected error", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.sign_form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.sign_form__header}>
          <h1>
            <FormattedMessage id="registration" />
          </h1>

          <InputRegister
            id="email"
            type="email"
            placeholder={emailString}
            register={{ ...register("email") }}
            errorMessageId={errors.email?.message}
            required={true}
          />

          <InputRegister
            id="phone"
            type="text"
            placeholder={phoneString}
            register={{ ...register("phone") }}
            errorMessageId={errors.phone?.message}
          />

          <InputRegister
            id="fullName"
            type="text"
            placeholder={fullNameString}
            register={{ ...register("fullName") }}
            errorMessageId={errors.fullName?.message}
          />

          <InputRegister
            id="organisation"
            type="text"
            placeholder={organisationString}
            register={{ ...register("organisation") }}
            errorMessageId={errors.organisation?.message}
          />

          <InputRegister
            id="password"
            type="password"
            placeholder={passwordString}
            register={{ ...register("password") }}
            errorMessageId={errors.password?.message}
            required={true}
          />

          <InputRegister
            id="repeatPassword"
            type="password"
            placeholder={repeatPasswordString}
            register={{ ...register("repeatPassword") }}
            errorMessageId={errors.repeatPassword?.message}
            required={true}
          />
        </div>
        <div className={styles.sign_form__buttons}>
          <button className="btn" onClick={handleSubmit(onSubmit)}>
            <FormattedMessage id="signUp" />
          </button>
          <Link to={LOGIN_ROUTE}>
            <FormattedMessage id="haveAnAccount" />
          </Link>
        </div>
      </form>
    </div>
  );
}
