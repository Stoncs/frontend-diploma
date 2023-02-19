import React from "react";
import { Link } from "react-router-dom";
import { getDevices, addNewDevice } from "~/http/api";
import { DEVICE_SETTINGS_ROUTE } from "~/utils/consts";

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

  const fetchDevices = async () => {
    const data = await getDevices(localStorage.getItem("id")!);
    setDevices(data);
  };
  // get devices
  React.useEffect(() => {
    try {
      fetchDevices();
    } catch (e) {
      alert(e);
    }
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
      <label>Ключ камеры:</label>
      <input name="key" value={key} onChange={(e) => setKey(e.target.value)} />
      <button onClick={() => onClickAddButton()}>
        Добавить новое устройство
      </button>
      {devices.map((device, i) => (
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
