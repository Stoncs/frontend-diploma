import React from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { getDevicesForUser, addNewDevice, getDevicesAll } from "~/http/api";
import { useAppSelector } from "~/redux/hooks";
import { UserDetails } from "~/redux/types";
import { DEVICE_SETTINGS_ROUTE, LOGIN_ROUTE } from "~/utils/consts";

interface IDevice {
  id: number;
  key: string;
  name: string;
  mode: string;
  signal: string;
  view: string;
}

export const Devices = () => {
  const [key, setKey] = React.useState("");
  const [devices, setDevices] = React.useState<IDevice[]>([]);
  const navigate = useNavigate();

  const user = useAppSelector<UserDetails>((state) => state.user);

  const fetchDevices = async () => {
    try {
      if (user.roles.includes("ROLE_ADMIN")) {
        // Админ имеет доступ ко всем камерам
        const data = await getDevicesAll(user.username);
        setDevices(data);
      } else {
        // Пользователь имеет доступ только к своим камерам
        const data = await getDevicesForUser(user.id);
        setDevices(data);
      }
    } catch (e) {
      alert(e);
      navigate(LOGIN_ROUTE);
    }
  };
  // get devices
  React.useEffect(() => {
    fetchDevices();
  }, []);

  const onClickAddButton = async () => {
    try {
      await addNewDevice(localStorage.getItem("id")!, key);
      alert("Успешно");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      {user.roles.includes("ROLE_ADMIN") ? (
        <button>Добавить новое устройство</button>
      ) : (
        <>
          <label>Ключ камеры:</label>
          <input
            name="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <button onClick={() => onClickAddButton()}>
            Добавить новое устройство
          </button>
        </>
      )}
      {devices.map((device) => (
        <div key={device.id}>
          Название:{" "}
          <Link to={DEVICE_SETTINGS_ROUTE.slice(0, -3) + device.id}>
            {device.name}
          </Link>
          , Режим работы: {device.mode}, Сигнал: {device.signal}, Вид:{" "}
          {device.view}
        </div>
      ))}
    </div>
  );
};
