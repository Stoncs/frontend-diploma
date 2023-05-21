import { LOCALES } from "./locales";

// Текст для страниц регистрации и входа
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
  recoverPassword: "Password recovery",
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
  signInLabel: "Войти в систему",
  authorization: "Авторизация",
  signIn: "Войти",
  signUp: "Зарегистрироваться",
  recoverPassword: "Восстановить пароль",
  haveAnAccount: "Есть аккаунт? Войдите.",
  registration: "Регистрация",
  fieldIsRequired: "Поле обязательное для заполнения",
};

// Текст для страницы восстановления пароля
const eng_recoveryPassword = {
  recoveryPasswordHeader: "Recovery password",
  enterEmail: "Enter your email address",
  recoveryPasswordButton: "Send",
};

const ru_recoveryPassword = {
  recoveryPasswordHeader: "Восстановление пароля",
  enterEmail: "Введите адрес электронной почты",
  recoveryPasswordButton: "Отправить",
};

const eng_devicesPage = {
  devicesPageHeader: "Available devices",
  enterKeyDevice: "Camera key",
  enterNameDevice: "Name device",
  addNewDevice: "Add",
  searchDevice: "Search",
  nameDevice: "Name",
  modeDevice: "Mode",
  signalDevice: "Signal",
  viewDevice: "View",
  address: "Address",
};

const ru_devicesPage = {
  devicesPageHeader: "Доступные устройства",
  enterKeyDevice: "Ключ камеры",
  enterNameDevice: "Название",
  addNewDevice: "Добавить",
  searchDevice: "Поиск",
  nameDevice: "Название",
  modeDevice: "Режим работы",
  signalDevice: "Сигнал",
  viewDevice: "Вид",
  address: "Адрес",
};

// Текст ошибок
const eng_errors = {
  error: "Error!",
  errKeyNotFound: "Device with this key not found",
  errFieldRequired: "This field must not be empty",
  errEmailIncorrect: "Email is incorrect",
  errPhoneMaxLength: "Phone number too long",
  errPhoneIncorrect: "Phone number is incorrect",
  errPasswordMinLength: "Password is too short",
  errRepeatPassword: "Password mismatch",
  errEmailNotFound: "User with this email was not found",
  errUnexpected: "Unexpected error, please try again later",
};

const ru_errors = {
  error: "Ошибка!",
  errKeyNotFound: "Устройство с таким ключом не найдено",
  errFieldRequired: "Поле не должно быть пустым",
  errEmailIncorrect: "Почта некорректная",
  errPhoneMaxLength: "Номер телефона слишком длинный",
  errPhoneIncorrect: "Номер телефона некорректный",
  errPasswordMinLength: "Пароль слишком короткий",
  errRepeatPassword: "Пароли несовпадают",
  errEmailNotFound: "Пользователь с таким email не найден",
  errUnexpected: "Непредвиденная ошибка, попробуйте позже",
};

export const messages = {
  [LOCALES.ENGLISH]: {
    ...eng_signInUp,
    ...eng_recoveryPassword,
    ...eng_devicesPage,
    ...eng_errors,
  },
  [LOCALES.RUSSIAN]: {
    ...ru_signInUp,
    ...ru_recoveryPassword,
    ...ru_devicesPage,
    ...ru_errors,
  },
};
