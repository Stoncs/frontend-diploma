import { AxiosError } from "axios";
import React from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { getDevicesForUser, addNewDevice, getDevicesAll } from "~/http/api";
import { setPopup } from "~/redux/actions/popup";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { UserDetails } from "~/redux/types";
import { EVENTS_ROUTE, LOGIN_ROUTE } from "~/utils/consts";
import { AddDeviceAdminPopup } from "~/view/components/addDeviceAdminPopup/AddDeviceAdminPopup.component";
import { MenuIcon } from "~/view/components/menuIcon/MenuIcon.component";
import { Pagination } from "~/view/components/pagination/Pagination.component";

import styles from "./devices.scss";

// Поиск не сделан
// При добавлении устройства с несуществующим ключом сделать попап ошибку
interface IDevice {
  id: number;
  key: string;
  name: string;
  mode: string;
  signal: string;
  view: string;
  address: string;
}

export const Devices = () => {
  // Попап для добавления нового устройства для админа
  const [addDeviceAdmin, setAddDeviceAdmin] = React.useState(false);
  // Поле для добавления новой камеры
  const [keyDevice, setKeyDevice] = React.useState("");
  // Поле для поиска
  const [nameDevice, setNameDevice] = React.useState("");
  // Все камеры
  const [devices, setDevices] = React.useState<IDevice[]>([]);
  // Текущая страница в пагинации
  const [currentPage, setCurrentPage] = React.useState(1);
  // Количество камер на одной странице
  const [devicesPerPage, setdevicesPerPage] = React.useState(10);

  const navigate = useNavigate();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const user = useAppSelector<UserDetails>((state) => state.user);
  const userEmail = localStorage.getItem("email");
  const userId = localStorage.getItem("id");
  const userRoles = localStorage.getItem("roles");

  const fetchDevices = async () => {
    try {
      if (user.roles.includes("ROLE_ADMIN")) {
        // Админ имеет доступ ко всем камерам
        const data = await getDevicesAll(userEmail!);
        setDevices(data);
        console.log(data);
      } else {
        // Пользователь имеет доступ только к своим камерам
        const data = await getDevicesForUser(Number(userId!));
        setDevices(data);
        console.log(data);
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
      await addNewDevice(localStorage.getItem("id")!, keyDevice);
      dispatch(
        setPopup({
          header: "Успешно!",
          message: "Устройство добавлено",
          type: "normal",
        })
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message.includes("key not found")) {
          dispatch(
            setPopup({
              header: intl.formatMessage({ id: "error" }),
              message: intl.formatMessage({ id: "errKeyNotFound" }),
              type: "error",
            })
          );
        }
      } else {
        dispatch(
          setPopup({
            header: intl.formatMessage({ id: "error" }),
            message: intl.formatMessage({ id: "errUnexpected" }),
            type: "error",
          })
        );
      }
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
      <div className={styles.container}>
        <div className={styles.devices_window}>
          <div className={styles.devices_window__top}>
            <h1>{intl.formatMessage({ id: "devicesPageHeader" })}</h1>
            <div className={styles.devices_window__control}>
              {userRoles!.includes("ROLE_ADMIN") ? (
                <div
                  className={`${styles.block_control} ${styles.button_admin}`}
                >
                  <button
                    className={styles.button}
                    onClick={() => setAddDeviceAdmin(true)}
                  >
                    Добавить новое устройство
                  </button>
                </div>
              ) : (
                <div className={styles.block_control}>
                  <input
                    className={styles.input}
                    name="key"
                    value={keyDevice}
                    placeholder={intl.formatMessage({ id: "enterKeyDevice" })}
                    onChange={(e) => setKeyDevice(e.target.value)}
                  />
                  <button
                    className={styles.button_in_block}
                    onClick={() => onClickAddButton()}
                  >
                    {intl.formatMessage({ id: "addNewDevice" })}
                  </button>
                </div>
              )}
              <div className={styles.block_control}>
                <input
                  className={styles.input}
                  name="nameDevice"
                  value={nameDevice}
                  placeholder={intl.formatMessage({ id: "enterNameDevice" })}
                  onChange={(e) => setNameDevice(e.target.value)}
                />
                <button
                  className={styles.button_in_block}
                  onClick={() => onClickAddButton()}
                >
                  {intl.formatMessage({ id: "searchDevice" })}
                </button>
              </div>
            </div>
            <table>
              <thead>
                <tr className={styles.table_header}>
                  <th className={styles.first}>
                    {intl.formatMessage({ id: "nameDevice" })}
                  </th>
                  <th className={styles.second}>
                    {intl.formatMessage({ id: "address" })}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentDevices.map((device) => (
                  <tr key={device.id}>
                    <td className={styles.first}>
                      <Link to={EVENTS_ROUTE.slice(0, -3) + device.id}>
                        {device.name}
                      </Link>
                    </td>
                    <td className={styles.second}>{device.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          }
          <MenuIcon />
        </div>
      </div>
      {userRoles!.includes("ROLE_ADMIN") && addDeviceAdmin && (
        <AddDeviceAdminPopup setAddDeviceAdmin={setAddDeviceAdmin} />
      )}
    </>
  );
};
