import { AxiosError } from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDeviceParameters, changeDeviceParameters } from "~/http/api";
import { useAppSelector } from "~/redux/hooks";
import { UserDetails } from "~/redux/types";
import { DEVICES_ROUTE } from "~/utils/consts";

interface IDevice {
  fov: string;
  focus: string;
  brightness: string;
}
interface ProfileFieldProps {
  type: string;
  title: string;
  initialValue: string;
  id: string;
}
// Компонент DeviceField
const DeviceField = ({ type, title, initialValue, id }: ProfileFieldProps) => {
  const [available, setAvailable] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div>
      <p>{title}</p>
      {available ? (
        <input
          value={value}
          onChange={(e) => {
            if (e.target) setValue(e.target.value);
          }}
        />
      ) : (
        <input value={value} disabled />
      )}
      {available ? (
        <button
          onClick={async () => {
            try {
              const data = await changeDeviceParameters(type, value, id);
              console.log(data);
            } catch (error) {
              alert(error);
            }

            setAvailable(!available);
          }}
        >
          Сохранить
        </button>
      ) : (
        <button
          onClick={() => {
            setAvailable(!available);
          }}
        >
          Изменить
        </button>
      )}
    </div>
  );
};

export const DeviceSettings = () => {
  const { id: deviceId } = useParams();
  const [deviceParameters, setDeviceParameters] = React.useState<IDevice>();
  const user = useAppSelector<UserDetails>((state) => state.user);
  const navigate = useNavigate();
  // Метод для получения параметров камеры
  const fetchDeviceParameters = async () => {
    try {
      const data = await getDeviceParameters(deviceId!, user.username);
      return data;
    } catch (e) {
      // сообщение
      alert(e);
      // перенаправить
      navigate(DEVICES_ROUTE);
    }
  };

  // Получение информации о камере
  React.useEffect(() => {
    fetchDeviceParameters().then((data) => {
      setDeviceParameters(data);
    });
  }, []);
  return (
    <div>
      <h1>Настройка Девайса {deviceId}</h1>
      <DeviceField
        type="fov"
        title="Угол обзора"
        initialValue={
          deviceParameters?.fov === undefined ? "-" : deviceParameters.fov
        }
        id={deviceId!}
      />
      <DeviceField
        type="focus"
        title="Фокус"
        initialValue={
          deviceParameters?.focus === undefined ? "-" : deviceParameters.focus
        }
        id={deviceId!}
      />
      <DeviceField
        type="brightness"
        title="Яркость"
        initialValue={
          deviceParameters?.brightness === undefined
            ? "-"
            : deviceParameters.brightness
        }
        id={deviceId!}
      />
    </div>
  );
};
