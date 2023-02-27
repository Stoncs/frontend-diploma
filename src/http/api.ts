import jwt_decode from "jwt-decode";
import { setUser } from "~/redux/actions/user";
import { useAppDispatch } from "~/redux/hooks";
import { $authHost, $host } from ".";

// Авторизация
export const logIn = async (username: String, password: String) => {
  const { data } = await $host.post("/api/auth/signin", { username, password });

  localStorage.setItem("token", data.token);
  localStorage.setItem("id", data.id);
  localStorage.setItem("username", data.username);
  localStorage.setItem("fullname", data.fullname);
  localStorage.setItem("organisation", data.organisation);
  localStorage.setItem("phoneNumber", data.phoneNumber);

  return jwt_decode(data.token);
};

// Отправление письма на почту (username = email)
export const sendEmail = async (username: String) => {
  const { data } = await $host.post("/api/password/forgot", { username });
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
  username: String
) => {
  const { data } = await $authHost.post(
    "/api/profile/changeprofile",
    {},
    {
      params: {
        type,
        value,
        username,
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
export const getDevices = async (id: String) => {
  const { data } = await $authHost.get("/api/device/show", { params: { id } });
  return data;
};

// Получение параметров устройства
export const getDeviceParameters = async (id: String, username: string) => {
  const { data } = await $authHost.get("/api/device/show_parameters", {
    params: { id, username },
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
export const getUserProfile = async (username: string) => {
  const { data } = await $authHost.get("/api/profile/getinfo", {
    params: { username },
  });
  return data;
};
