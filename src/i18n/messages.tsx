import { LOCALES } from "./locales";

const eng_signInUp = {
  email: "Email",
  fullName: "Full name",
  phone: "Phone",
  organisation: "Organisation",
  password: "Password",
  repeatPassword: "Repeat password",
  signInLabel: "Sign in",
  authorization: "Sign in",
  signIn: "Sign in",
  signUp: "Sign up",
  passwordRecovery: "Password recovery",
  haveAnAccount: "Have an account? Sign in.",
  registration: "Registration",
  fieldIsRequired: "This field is required",
};

const ru_signInUp = {
  email: "Почта",
  fullName: "Полное имя",
  phone: "Телефон",
  organisation: "Организация",
  password: "Пароль",
  repeatPassword: "Повторите пароль",
  signInLabel: "Регистрация",
  authorization: "Авторизация",
  signIn: "Войти",
  signUp: "Зарегистрироваться",
  passwordRecovery: "Восстановить пароль",
  haveAnAccount: "Есть аккаунт? Войдите.",
  registration: "Регистрация",
  fieldIsRequired: "Поле обязательное для заполнения",
};

const eng_errors = {
  errFieldRequired: "This field must not be empty",
  errEmailIncorrect: "Email is incorrect",
  errPhoneMaxLength: "Phone number too long",
  errPhoneIncorrect: "Phone number is incorrect",
  errPasswordMinLength: "Password is too short",
  errRepeatPassword: "Password mismatch",
};

const ru_errors = {
  errFieldRequired: "Поле не должно быть пустым",
  errEmailIncorrect: "Почта некорректная",
  errPhoneMaxLength: "Номер телефона слишком длинный",
  errPhoneIncorrect: "Номер телефона некорректный",
  errPasswordMinLength: "Пароль слишком короткий",
  errRepeatPassword: "Пароли несовпадают",
};

export const messages = {
  [LOCALES.ENGLISH]: {
    ...eng_signInUp,
    ...eng_errors,
  },
  [LOCALES.RUSSIAN]: {
    ...ru_signInUp,
    ...ru_errors,
  },
};
