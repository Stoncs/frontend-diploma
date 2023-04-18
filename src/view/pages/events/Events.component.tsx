import { AxiosError } from "axios";
import React from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import {
  getDevicesForUser,
  addNewDevice,
  getDevicesAll,
  getEventsDevice,
} from "~/http/api";
import { setPopup } from "~/redux/actions/popup";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { UserDetails } from "~/redux/types";
import {
  DEVICE_SETTINGS_ROUTE,
  LOGIN_ROUTE,
  STATISTICS_ROUTE,
} from "~/utils/consts";
import { AddDeviceAdminPopup } from "~/view/components/addDeviceAdminPopup/AddDeviceAdminPopup.component";
import { MenuIcon } from "~/view/components/menuIcon/MenuIcon.component";
import { Pagination } from "~/view/components/pagination/Pagination.component";

import styles from "./events.scss";

// Поиск не сделан
// При добавлении устройства с несуществующим ключом сделать попап ошибку
interface IEvent {
  id: number;
  carId: string;
  speed: string;
  time: string;
  typeOfCar: string;
  typeOfEvent: string;
}

export const Events = () => {
  const { key: keyDevice } = useParams();
  // Поле для поиска
  const [nameDevice, setNameDevice] = React.useState("");
  // Все камеры
  const [events, setEvents] = React.useState<IEvent[]>([]);
  // Текущая страница в пагинации
  const [currentPage, setCurrentPage] = React.useState(1);
  // Количество камер на одной странице
  const [eventsPerPage, setEventsPerPage] = React.useState(10);

  const navigate = useNavigate();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const user = useAppSelector<UserDetails>((state) => state.user);
  const userEmail = localStorage.getItem("email");
  const userId = localStorage.getItem("id");
  const userRoles = localStorage.getItem("roles");

  const fetchEvents = async () => {
    try {
      // Пользователь имеет доступ только к своим камерам
      const data = await getEventsDevice(keyDevice!);
      setEvents(data);
      console.log(data);
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
    console.log("events get");
    fetchEvents();
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Функция для смены страницы
  const handlePageChange = (pageNumber: number): void =>
    setCurrentPage(pageNumber);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.devices_window}>
          <div className={styles.devices_window__top}>
            <h1>События устройства {keyDevice}</h1>
            <div className={styles.devices_window__control}>
              <div className={styles.block_control}>
                <input
                  className={styles.input}
                  name="nameDevice"
                  value={nameDevice}
                  placeholder={intl.formatMessage({ id: "enterNameDevice" })}
                  onChange={(e) => setNameDevice(e.target.value)}
                />
                <button className={styles.button_in_block}>
                  {intl.formatMessage({ id: "searchDevice" })}
                </button>
                <button
                  className={styles.button_in_block}
                  onClick={() =>
                    navigate(STATISTICS_ROUTE.slice(0, -4) + keyDevice)
                  }
                >
                  Статистика
                </button>
              </div>
            </div>
            <table>
              <thead>
                <tr className={styles.table_header}>
                  <th>Номер машины</th>
                  <th>Скорость (км/ч)</th>
                  <th>Дата</th>
                  <th>Тип машины</th>
                  <th>Тип события</th>
                </tr>
              </thead>
              <tbody>
                {currentEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.carId}</td>
                    <td>{event.speed}</td>
                    <td>{event.time}</td>
                    <td>
                      {event.typeOfCar === "0"
                        ? "Легковая"
                        : event.typeOfCar === "1"
                        ? "Грузовая"
                        : event.typeOfCar === "2"
                        ? "Спец.транспорт"
                        : "Автобус"}
                    </td>
                    <td>
                      {event.typeOfEvent === "0"
                        ? "Проезд"
                        : event.typeOfEvent === "1"
                        ? "Превышение скорости"
                        : "Проезд перед пешеходом"}
                    </td>
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
    </>
  );
};
