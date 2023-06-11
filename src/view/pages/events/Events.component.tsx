import { AxiosError } from "axios";
import React from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";

import { getEventsDevice } from "../../../http/api";
import photo_action from "../../../assets/action_photo.png";
import export_png from "../../../assets/export.png";
import { MenuIcon } from "../../../view/components/menuIcon/MenuIcon.component";
import { Pagination } from "../../../view/components/pagination/Pagination.component";
import { LOGIN_ROUTE, STATISTICS_ROUTE } from "../../../utils/consts";

import styles from "./events.scss";

interface IEvent {
  id: number;
  carId: string;
  speed: string;
  time: string;
  typeOfCar: string;
  typeOfEvent: string;
}

export const Events = () => {
  const { id: keyDevice } = useParams();
  // Поле для поиска
  const [nameDevice, setNameDevice] = React.useState("");

  // Фильтр по типу события
  const [eventTypeFilter, setEventTypeFilter] = React.useState("");
  // Фильтр по типу автомобиля
  const [carTypeFilter, setCarTypeFilter] = React.useState("");

  // Все камеры
  const [events, setEvents] = React.useState<IEvent[]>([]);
  // Текущая страница в пагинации
  const [currentPage, setCurrentPage] = React.useState(1);
  // Количество камер на одной странице
  const [eventsPerPage, setEventsPerPage] = React.useState(10);

  const navigate = useNavigate();
  const intl = useIntl();

  const exportScv = () => {
    const typeOfFiltration =
      eventTypeFilter === "" && carTypeFilter === ""
        ? "3"
        : eventTypeFilter !== "" && carTypeFilter !== ""
        ? "2"
        : carTypeFilter !== ""
        ? "1"
        : "0";

    let url = `http://localhost:8080/api/event/export?id=${keyDevice}&typeOfFiltration=${typeOfFiltration}`;

    if (carTypeFilter !== "") {
      url += `&typeOfCar=${carTypeFilter}`;
    }

    if (eventTypeFilter !== "") {
      url += `&typeOfEvent=${eventTypeFilter}`;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fetchEvents = async () => {
    try {
      const typeOfFiltration =
        eventTypeFilter === "" && carTypeFilter === ""
          ? "3"
          : eventTypeFilter !== "" && carTypeFilter !== ""
          ? "2"
          : carTypeFilter !== ""
          ? "1"
          : "0";
      const data = await getEventsDevice(
        keyDevice!,
        typeOfFiltration,
        carTypeFilter,
        eventTypeFilter
      );
      console.log(data);
      setEvents(
        data.sort(
          (a: any, b: any) =>
            Number(new Date(a.time)) - Number(new Date(b.time))
        )
      );
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
    fetchEvents();
  }, [carTypeFilter, eventTypeFilter]);

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
            <div className={styles.header}>
              <h1>События устройства {keyDevice}</h1>
              <img
                src={export_png}
                className={styles.export_png}
                onClick={() => exportScv()}
                data-testid="export-csv-button"
              />
            </div>

            <div className={styles.devices_window__control}>
              <div className={styles.block_control}>
                <input
                  className={styles.input}
                  name="nameDevice"
                  value={nameDevice}
                  placeholder="Номер"
                  onChange={(e) => setNameDevice(e.target.value)}
                />
                <button className={styles.button_in_block}>
                  {intl.formatMessage({ id: "searchDevice" })}
                </button>

                {/* Event Type Filter */}
                <select
                  className={styles.select}
                  value={eventTypeFilter}
                  onChange={(e) => setEventTypeFilter(e.target.value)}
                  data-testid="car-type-filter"
                >
                  <option value="">Все типы событий</option>
                  <option value="0">Проезд</option>
                  <option value="1">Превышение скорости</option>
                  <option value="2">Проезд перед пешеходом</option>
                </select>

                {/* Car Type Filter */}
                <select
                  className={styles.select}
                  value={carTypeFilter}
                  onChange={(e) => setCarTypeFilter(e.target.value)}
                  data-testid="event-type-filter"
                >
                  <option value="">Все типы машин</option>
                  <option value="0">Легковая</option>
                  <option value="1">Грузовая</option>
                  <option value="2">Спец.транспорт</option>
                  <option value="3">Автобус</option>
                </select>
                <button
                  className={styles.button_in_block}
                  onClick={() =>
                    navigate(STATISTICS_ROUTE.slice(0, -3) + keyDevice)
                  }
                >
                  Статистика
                </button>
              </div>
            </div>
            <table>
              <thead>
                <tr className={styles.table_header}>
                  <th></th> {/* Пустая ячейка для иконки */}
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
                    <td>
                      <img src={photo_action} className={styles.action_photo} />
                    </td>

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

          <div className={styles.pagination}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          <MenuIcon />
        </div>
      </div>
    </>
  );
};
