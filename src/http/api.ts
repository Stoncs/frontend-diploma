import { AxiosError } from "axios";
import jwt_decode from "jwt-decode";
import { $authHost, $host } from ".";

// Авторизация
export const logIn = async (email: String, password: String) => {
  const { data } = await $host.post("/api/auth/signin", {
    username: email,
    password,
  });
  console.log(data);

  localStorage.setItem("token", data.token);
  localStorage.setItem("id", data.id);
  localStorage.setItem("email", data.username);
  localStorage.setItem("fullname", data.fullname);
  localStorage.setItem("organisation", data.organisation);
  localStorage.setItem("phoneNumber", data.phoneNumber);

  return data;
};

// Отправление письма на почту
export const sendEmail = async (email: String) => {
  const { data } = await $host.post("/api/password/forgot", {
    username: email,
  });
  return data;
};

// Изменение пароля
export const changePassword = async (newPassword: String, token: String) => {
  const { data } = await $host.post("/api/password/reset", {
    newPassword,
    token,
  });
  return data;
};

// Изменение информации в профиле
export const changeProfile = async (
  type: String,
  value: String,
  email: String
) => {
  const { data } = await $authHost.post(
    "/api/profile/changeprofile",
    {},
    {
      params: {
        type,
        value,
        username: email,
      },
    }
  );
  return data;
};

// Добавление пользователю нового устройства
export const addNewDevice = async (id: String, key: String) => {
  const { data } = await $authHost.post("/api/device/link", {
    id,
    key,
  });
  return data;
};

// Получение списка устройств для пользователя
export const getDevicesForUser = async (id: Number) => {
  const { data } = await $authHost.get("/api/device/show", { params: { id } });
  return data;
};

// Получение списка устройств для админа
export const getDevicesAll = async (email: String) => {
  const { data } = await $authHost.get("/api/device/show_all", {
    params: { username: email },
  });
  return data;
};

// Получение параметров устройства
export const getDeviceParameters = async (id: String, email: String) => {
  const { data } = await $authHost.get("/api/device/show_parameters", {
    params: { id, username: email },
  });
  console.log(data);
  return data;
};

// Изменение настроек камеры
export const changeDeviceParameters = async (
  type: String,
  value: String,
  id: String
) => {
  const { data } = await $authHost.post("/api/device/change_parameters", {
    type,
    value,
    id: Number(id),
  });
  return data;
};

// Получение информации о профиле
export const getUserProfile = async (email: string) => {
  try {
    const { data } = await $authHost.get("/api/profile/getinfo", {
      params: { username: email },
    });
    return data;
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
