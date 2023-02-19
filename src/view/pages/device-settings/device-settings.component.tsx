import React from "react";
import { Link, useParams } from "react-router-dom";
import { getDeviceParameters, changeDeviceParameters } from "~/http/api";

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

  const fetchDeviceParameters = async () => {
    const data = await getDeviceParameters(deviceId!);
    return data;
  };
  React.useEffect(() => {
    try {
      fetchDeviceParameters().then((data) => {
        console.log(data);
        setDeviceParameters(data);
      });
    } catch (e) {
      alert(e);
    }
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