import axios from "axios";
// Неавторизованные запросы
const $host = axios.create({
  baseURL: "http://localhost:8080/",
});

// Авторизованные запросы
const $authHost = axios.create({
  baseURL: "http://localhost:8080/",
});

// В авторизованных запросах в заголовке jwt токен
const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

// В авторизованных запросах в заголовке jwt токен
$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
