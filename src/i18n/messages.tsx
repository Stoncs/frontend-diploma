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
  enterNameDevice: "Name device or address",
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
  enterNameDevice: "Название или адрес",
  addNewDevice: "Добавить",
  searchDevice: "Поиск",
  nameDevice: "Название",
  modeDevice: "Режим работы",
  signalDevice: "Сигнал",
  viewDevice: "Вид",
  address: "Адрес",
};

const eng_eventsPage = {
  eventsPageHeader: "Device events",
  numberSearch: "Number",
  allTypesEvents: "All types of events",
  passage: "Passage",
  overSpeed: "Over speed",
  passageFrontPed: "Passage in front of a pedestrian",
  allTypesCar: "All types of car",
  passengerCar: "Passenger Car",
  truck: "Truck",
  specialTransport: "Special transport",
  bus: "Bus",
  staticsticsButton: "Statistics",
  numberOfTheCar: "Number of the car",
  speedCarStatistics: "Speed ​​(km/h)",
  dateStatistics: "Date",
  carTypeStatistics: "Car type",
  eventTypeStatistics: "Event type",
};

const ru_eventsPage = {
  eventsPageHeader: "События устройства",
  numberSearch: "Номер",
  allTypesEvents: "Все типы событий",
  passage: "Проезд",
  overSpeed: "Превышение скорости",
  passageFrontPed: "Проезд перед пешеходом",
  allTypesCar: "Все типы машин",
  passengerCar: "Легковая",
  truck: "Грузовая",
  specialTransport: "Спец.транспорт",
  bus: "Автобус",
  staticsticsButton: "Статистика",
  numberOfTheCar: "Номер машины",
  speedCarStatistics: "Скорость (км/ч)",
  dateStatistics: "Дата",
  carTypeStatistics: "Тип машины",
  eventTypeStatistics: "Тип события",
};

const eng_statisticsPage = {
  statisticsPageHeader: "Statistics",
  statisticsDate: "Date",
  statisticsPeriod: "Period",
  statisticsEvents: "Events",
  countCar: "Total transport:",
  countTypeCar0: "Number of passenger cars:",
  avSpeedByTypeCar0: "Average speed of passenger cars:",
  kmh: "km/h",
  countTypeCar1: "Number of trucks:",
  avSpeedByTypeCar1: "Average speed of trucks:",
  countTypeCar2: "Number of special transport:",
  avSpeedByTypeCar2: "Average speed of special transport:",
  countTypeCar3: "Number of buses:",
  avSpeedByTypeCar3: "Average speed of buses:",
  canvasTypeEvents: "Event types",
  canvasTypeCars: "Car types",
  canvasEvSpeed: "Everage speed",
};
const ru_statisticsPage = {
  statisticsPageHeader: "Статистика",
  statisticsDate: "Дата",
  statisticsPeriod: "Период",
  statisticsEvents: "События",
  countCar: "Всего транспорта:",
  countTypeCar0: "Количество легковых:",
  avSpeedByTypeCar0: "Средняя скорость легковых:",
  kmh: "км/ч",
  countTypeCar1: "Количество грузовых:",
  avSpeedByTypeCar1: "Средняя скорость грузовых:",
  countTypeCar2: "Количество спец. транспорта:",
  avSpeedByTypeCar2: "Средняя скорость спец. траспорта:",
  countTypeCar3: "Количество автобусов:",
  avSpeedByTypeCar3: "Средняя скорость автобусов:",
  canvasTypeEvents: "Типы событий",
  canvasTypeCars: "Типы автомобилей",
  canvasEvSpeed: "Средняя скорость",
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
  errRepeatPassword: "Пароли не совпадают",
  errEmailNotFound: "Пользователь с таким email не найден",
  errUnexpected: "Непредвиденная ошибка, попробуйте позже",
};

export const messages = {
  [LOCALES.ENGLISH]: {
    ...eng_signInUp,
    ...eng_recoveryPassword,
    ...eng_devicesPage,
    ...eng_errors,
    ...eng_eventsPage,
    ...eng_statisticsPage,
  },
  [LOCALES.RUSSIAN]: {
    ...ru_signInUp,
    ...ru_recoveryPassword,
    ...ru_devicesPage,
    ...ru_errors,
    ...ru_eventsPage,
    ...ru_statisticsPage,
  },
};
