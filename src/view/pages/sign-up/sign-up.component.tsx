import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import axios, { AxiosError } from "axios";

import styles from "./sign-up.style.scss";

import { LOGIN_ROUTE } from "~/utils/consts";

type IFormInputs = {
  phone: string;
  email: string;
  fullName: string;
  organisation: string;
  password: string;
};

export default function SingUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const navigate = useNavigate();

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
        console.log(error.response?.data.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
    console.log({
      username: data.email,
      phoneNumber: data.phone,
      fullname: data.fullName,
      password: data.password,
      organisation: data.organisation,
    });
  };
  // const [phone, setPhone] = React.useState("");
  // const [email, setEmail] = React.useState("");
  // const [fullName, setFullName] = React.useState("");
  // const [organisation, setOrganisation] = React.useState("");
  // const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");

  // const onSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post<CreateUserResponse>("http://localhost:8080/register", {
  //       phone,
  //       username: email,
  //       fullname: fullName,
  //       organisation,
  //       password,
  //     });
  //     navigate(LOGIN_ROUTE);
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       // eslint-disable-next-line no-console
  //       console.log(error.response?.data.message);
  //     } else {
  //       console.log("Unexpected error", error);
  //     }
  //   }
  // };

  return (
    <form className={styles.sign_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.sign_form__header}>
        <h1>
          <FormattedMessage id="signInLabel" />
        </h1>
        <div className={styles.sign_form__input}>
          <label htmlFor="email">
            <FormattedMessage id="email" />
          </label>
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            })}
          />
          {errors?.email?.type === "required" && <p>This field is required</p>}
          {errors?.email?.type === "pattern" && <p>Not correct email</p>}
        </div>
        <div className={styles.sign_form__input}>
          <label htmlFor="phone">
            <FormattedMessage id="phone" />
          </label>
          <input
            type="tel"
            {...register("phone", {
              required: true,
              maxLength: 12,
              pattern: /(\+7|8)[\s(]*\d{3}[)\s]*\d{3}[\s-]?\d{2}[\s-]?\d{2}/,
            })}
          />
        </div>

        {errors?.phone?.type === "required" && <p>This field is required</p>}
        {errors?.phone?.type === "pattern" && <p>Not correct phone</p>}
        {errors?.phone?.type === "maxLength" && (
          <p>Слишком длинный номер телефона</p>
        )}
        <div className={styles.sign_form__input}>
          <label htmlFor="fullName">
            <FormattedMessage id="fullName" />
          </label>
          <input type="text" {...register("fullName")} />
        </div>
        <div className={styles.sign_form__input}>
          <label htmlFor="organisation">
            <FormattedMessage id="organisation" />
          </label>
          <input type="text" {...register("organisation")} />
        </div>
        <div className={styles.sign_form__input}>
          <label htmlFor="password">
            <FormattedMessage id="password" />
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        {errors?.password?.type === "required" && <p>This field is required</p>}
        <div className={styles.sign_form__input}>
          <label htmlFor="repeatPassword">
            <FormattedMessage id="repeatPassword" />
          </label>
          <input
            type="password"
            name="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
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
  );
}
