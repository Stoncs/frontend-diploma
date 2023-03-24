import { AxiosError } from "axios";
import React from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { getDevicesForUser, addNewDevice, getDevicesAll } from "~/http/api";
import { useAppSelector } from "~/redux/hooks";
import { UserDetails } from "~/redux/types";
import { DEVICE_SETTINGS_ROUTE, LOGIN_ROUTE } from "~/utils/consts";
import { Pagination } from "~/view/components/pagination/Pagination.component";

import styles from "./devices.scss";

interface IDevice {
  id: number;
  key: string;
  name: string;
  mode: string;
  signal: string;
  view: string;
}

export const Devices = () => {
  // Поле для добавления новой камеры
  const [key, setKey] = React.useState("");
  // Все камеры
  const [devices, setDevices] = React.useState<IDevice[]>([]);
  // Текущая страница в пагинации
  const [currentPage, setCurrentPage] = React.useState(1);
  // Количество камер на одной странице
  const [devicesPerPage, setdevicesPerPage] = React.useState(1);

  const navigate = useNavigate();
  const intl = useIntl();

  const user = useAppSelector<UserDetails>((state) => state.user);

  const fetchDevices = async () => {
    try {
      if (user.roles.includes("ROLE_ADMIN")) {
        // Админ имеет доступ ко всем камерам
        const data = await getDevicesAll(user.email);
        setDevices(data);
      } else {
        // Пользователь имеет доступ только к своим камерам
        const data = await getDevicesForUser(user.id);
        setDevices(data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
      }
      alert(error);
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

  const indexOfLastCamera = currentPage * devicesPerPage;
  const indexOfFirstCamera = indexOfLastCamera - devicesPerPage;
  const currentDevices = devices.slice(indexOfFirstCamera, indexOfLastCamera);
  const totalPages = Math.ceil(devices.length / devicesPerPage);

  // Функция для смены страницы
  const handlePageChange = (pageNumber: number): void =>
    setCurrentPage(pageNumber);

  return (
    <>
      <div>
        {user.roles.includes("ROLE_ADMIN") ? (
          <button className={styles.button}>Добавить новое устройство</button>
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
      </div>
      <table>
        <thead>
          <tr className={styles.header}>
            <th>{intl.formatMessage({ id: "nameDevice" })}</th>
            <th>{intl.formatMessage({ id: "modeDevice" })}</th>
            <th>{intl.formatMessage({ id: "signalDevice" })}</th>
            <th>{intl.formatMessage({ id: "viewDevice" })}</th>
          </tr>
        </thead>
        <tbody>
          {currentDevices.map((device) => (
            <tr key={device.id}>
              <td>
                <Link to={DEVICE_SETTINGS_ROUTE.slice(0, -3) + device.id}>
                  {device.name}
                </Link>
              </td>
              <td>{device.mode}</td>
              <td>{device.signal}</td>
              <td>{device.view}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};
