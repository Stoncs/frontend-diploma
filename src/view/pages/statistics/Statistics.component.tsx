import { AxiosError } from "axios";
import React from "react";
import { Bar, Line, Chart } from "react-chartjs-2";
import { useNavigate, useParams } from "react-router";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";

import {
  getAverageSpeedByTypeCar,
  getAverageSpeedPerDay,
  getAverageSpeedPerHour,
  getEventsDevice,
  getTypeOfCarPerDay,
  getTypeOfCarPerHour,
  getTypeOfEventPerDay,
  getTypeOfEventPerHour,
} from "../../../http/api";
import { EVENTS_ROUTE, LOGIN_ROUTE } from "../../../utils/consts";
import { MenuIcon } from "../../../view/components/menuIcon/MenuIcon.component";

import styles from "./statistics.scss";
import { useIntl } from "react-intl";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Statistics = () => {
  const intl = useIntl();
  // Данные для графиков
  const [averageSpeedData, setAverageSpeedData] = React.useState<number[]>([]);
  const [typeCarData, setTypeCarData] = React.useState<number[][]>([]);
  const [typeEventData, setTypeEventData] = React.useState<number[][]>([]);

  const deviceName = localStorage.getItem("deviceName") || "";

  // Подсчёт всего автомобилей
  const [countCar, setCountCar] = React.useState(0);
  // Подсчёт по типам автомобилей
  const [countTypeCar, setCountTypeCar] = React.useState<number[]>([
    0, 0, 0, 0,
  ]);
  const [avSpeedByTypeCar, setAvSpeedByTypeCar] = React.useState([0, 0, 0, 0]);

  const valuesSelect = ["Дата", "Период"];
  const [stateSelect, setStateSelect] = React.useState(
    localStorage.getItem("valueSelect")
      ? String(localStorage.getItem("valueSelect"))
      : valuesSelect[0]
  );

  const [date, setDate] = React.useState(
    localStorage.getItem("date")
      ? String(localStorage.getItem("date"))
      : moment().format("YYYY-MM-DD")
  );
  const [date1, setDate1] = React.useState(
    localStorage.getItem("date1")
      ? String(localStorage.getItem("date1"))
      : moment().format("YYYY-MM-DD")
  );
  const [date2, setDate2] = React.useState(
    localStorage.getItem("date2")
      ? String(localStorage.getItem("date2"))
      : moment().format("YYYY-MM-DD")
  );
  const { id: keyDevice } = useParams();
  const navigate = useNavigate();

  const dataBarEventType = {
    labels:
      stateSelect === valuesSelect[0]
        ? typeEventData.map((_, i) => String(i + 1))
        : typeEventData.map((_, i) =>
            moment(date1).add(i, "days").format("DD.MM")
          ),
    datasets: [
      {
        label: intl.formatMessage({ id: "passage" }),
        data: typeEventData.map((hour) => hour[0]),
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
      {
        label: intl.formatMessage({ id: "overSpeed" }),
        data: typeEventData.map((hour) => hour[1]),
        backgroundColor: "rgb(75, 192, 192)",
        stack: "Stack 1",
      },
      {
        label: intl.formatMessage({ id: "passageFrontPed" }),
        data: typeEventData.map((hour) => hour[2]),
        backgroundColor: "rgb(53, 162, 235)",
        stack: "Stack 2",
      },
    ],
  };
  const dataBarCarType = {
    labels:
      stateSelect === valuesSelect[0]
        ? typeEventData.map((_, i) => String(i + 1))
        : typeEventData.map((_, i) =>
            moment(date1).add(i, "days").format("DD.MM")
          ),
    datasets: [
      {
        label: intl.formatMessage({ id: "passengerCar" }),
        data: typeCarData.map((hour) => hour[0]),
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
      {
        label: intl.formatMessage({ id: "truck" }),
        data: typeCarData.map((hour) => hour[1]),
        backgroundColor: "rgb(75, 192, 192)",
        stack: "Stack 1",
      },
      {
        label: intl.formatMessage({ id: "specialTransport" }),
        data: typeCarData.map((hour) => hour[2]),
        backgroundColor: "rgb(53, 162, 235)",
        stack: "Stack 2",
      },
      {
        label: intl.formatMessage({ id: "bus" }),
        data: typeCarData.map((hour) => hour[3]),
        backgroundColor: "rgb(64, 227, 68)",
        stack: "Stack 3",
      },
    ],
  };
  const dataLineAverageSpeed = {
    labels:
      stateSelect === valuesSelect[0]
        ? typeEventData.map((_, i) => String(i + 1))
        : typeEventData.map((_, i) =>
            moment(date1).add(i, "days").format("DD.MM")
          ),
    datasets: [
      {
        label: intl.formatMessage({ id: "canvasEvSpeed" }),
        data: averageSpeedData.map((hour) => hour),
        backgroundColor: "rgb(64, 227, 68)",
      },
    ],
  };
  const options1 = {
    plugins: {
      title: {
        display: true,
        text: intl.formatMessage({ id: "canvasTypeEvents" }),
      },
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  const options2 = {
    plugins: {
      title: {
        display: true,
        text: intl.formatMessage({ id: "canvasTypeCars" }),
      },
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  const options3 = {
    plugins: {
      title: {
        display: true,
        text: intl.formatMessage({ id: "canvasEvSpeed" }),
      },
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const onChangeDate = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const newDate = moment(new Date(e.target.value)).format("YYYY-MM-DD");
    switch (key) {
      case "date":
        setDate(newDate);
        break;
      case "date1":
        setDate1(newDate);
        break;
      case "date2":
        setDate2(newDate);
        break;
    }

    localStorage.setItem(key, newDate);
  };

  const fetchStatistic = async () => {
    try {
      let avSpeed, typesCar, typesEvent;
      if (stateSelect === valuesSelect[0]) {
        const splitDate = date.split("-");
        const year = +splitDate[0];
        const month = +splitDate[1];
        const day = +splitDate[2];
        avSpeed = await getAverageSpeedPerHour(
          year,
          month,
          day,
          Number(keyDevice!)
        );

        typesCar = await getTypeOfCarPerHour(
          year,
          month,
          day,
          Number(keyDevice!)
        );

        typesEvent = await getTypeOfEventPerHour(
          year,
          month,
          day,
          Number(keyDevice!)
        );
        setAvSpeedByTypeCar(
          await getAverageSpeedByTypeCar(
            year,
            month,
            day,
            year,
            month,
            day,
            Number(keyDevice!)
          )
        );
      } else {
        const splitDateFrom = date1.split("-");
        const splitDateTo = date2.split("-");
        const yearFrom = +splitDateFrom[0];
        const monthFrom = +splitDateFrom[1];
        const dayFrom = +splitDateFrom[2];
        const yearTo = +splitDateTo[0];
        const monthTo = +splitDateTo[1];
        const dayTo = +splitDateTo[2];
        avSpeed = await getAverageSpeedPerDay(
          yearFrom,
          monthFrom,
          dayFrom,
          yearTo,
          monthTo,
          dayTo,
          Number(keyDevice!)
        );
        typesCar = await getTypeOfCarPerDay(
          yearFrom,
          monthFrom,
          dayFrom,
          yearTo,
          monthTo,
          dayTo,
          Number(keyDevice!)
        );
        typesEvent = await getTypeOfEventPerDay(
          yearFrom,
          monthFrom,
          dayFrom,
          yearTo,
          monthTo,
          dayTo,
          Number(keyDevice!)
        );
        setAvSpeedByTypeCar(
          await getAverageSpeedByTypeCar(
            yearFrom,
            monthFrom,
            dayFrom,
            yearTo,
            monthTo,
            dayTo,
            Number(keyDevice!)
          )
        );
      }

      const dataForTypeCar = Array.from({ length: typesCar.length }, () =>
        Array(4).fill(0)
      );
      const dataForTypeEvent = Array.from({ length: typesEvent.length }, () =>
        Array(3).fill(0)
      );

      // Подготовка информации о типах машин для графика
      let j = 0;
      let count = 0;
      const countType = [0, 0, 0, 0];
      for (const obj of typesCar) {
        for (let i = 0; i < 4; i++) {
          if (obj[i]) {
            dataForTypeCar[j][i] = obj[i];
            countType[i] += obj[i];
            count += obj[i];
          } else {
            dataForTypeCar[j][i] = 0;
          }
        }
        j++;
      }
      setCountTypeCar(countType);
      setCountCar(count);
      // Подготовка информации о типах события для графика
      j = 0;
      for (const obj of typesEvent) {
        for (let i = 0; i < 3; i++) {
          obj[i]
            ? (dataForTypeEvent[j][i] = obj[i])
            : (dataForTypeEvent[j][i] = 0);
        }
        j++;
      }

      // Сохранение информации для графиков
      setAverageSpeedData(avSpeed);
      setTypeCarData(dataForTypeCar);
      setTypeEventData(dataForTypeEvent);
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
    fetchStatistic();
  }, [date, date1, date2, stateSelect]);

  return (
    <div className={styles.container}>
      <div className={styles.statistics_window}>
        <div className={styles.statistics_window__top}>
          <h1>
            {intl.formatMessage({ id: "statisticsPageHeader" })} {deviceName}
          </h1>
          <div className={styles.statistics_window__control}>
            <div className={styles.block_control}>
              <label htmlFor="selectDatePeriod">selectDatePeriod</label>
              <select
                id="selectDatePeriod"
                value={stateSelect}
                onChange={(e) => {
                  setStateSelect(e.target.value);
                  localStorage.setItem("valueSelect", e.target.value);
                }}
              >
                {valuesSelect.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              {stateSelect === valuesSelect[0] ? (
                <>
                  <label htmlFor="date">Дата</label>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => onChangeDate(e, "date")}
                  />
                </>
              ) : (
                <>
                  <label htmlFor="date1">Дата 1</label>
                  <input
                    id="date1"
                    type="date"
                    value={date1}
                    onChange={(e) => onChangeDate(e, "date1")}
                  />
                  <label htmlFor="date2">Дата 2</label>
                  <input
                    id="date2"
                    type="date"
                    value={date2}
                    onChange={(e) => onChangeDate(e, "date2")}
                  />
                </>
              )}

              <button
                className={styles.button_in_block}
                onClick={() => navigate(EVENTS_ROUTE.slice(0, -3) + keyDevice)}
              >
                {intl.formatMessage({ id: "statisticsEvents" })}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content__charts}>
            <label data-testid="barEventTypeChart">Типы событий</label>
            <Bar data={dataBarEventType} options={options1} />
            <label data-testid="barCarTypeChart">Типы машин</label>
            <Bar data={dataBarCarType} options={options2} />
            <label data-testid="lineAverageSpeedChart">Скорость</label>
            <Line data={dataLineAverageSpeed} options={options3} />
          </div>
          <div className={styles.content__text}>
            <p>
              {intl.formatMessage({ id: "countCar" })} {countCar}
            </p>
            <p>
              {intl.formatMessage({ id: "countTypeCar0" })} {countTypeCar[0]}
            </p>
            <p>
              {intl.formatMessage({ id: "avSpeedByTypeCar0" })}{" "}
              {avSpeedByTypeCar[0].toFixed(2)}{" "}
              {intl.formatMessage({ id: "kmh" })}
            </p>
            <p>
              {intl.formatMessage({ id: "countTypeCar1" })} {countTypeCar[1]}
            </p>
            <p>
              {intl.formatMessage({ id: "avSpeedByTypeCar1" })}{" "}
              {avSpeedByTypeCar[1].toFixed(2)}{" "}
              {intl.formatMessage({ id: "kmh" })}
            </p>
            <p>
              {intl.formatMessage({ id: "countTypeCar2" })} {countTypeCar[2]}
            </p>
            <p>
              {intl.formatMessage({ id: "avSpeedByTypeCar2" })}{" "}
              {avSpeedByTypeCar[2].toFixed(2)}{" "}
              {intl.formatMessage({ id: "kmh" })}
            </p>
            <p>
              {intl.formatMessage({ id: "countTypeCar3" })} {countTypeCar[3]}
            </p>
            <p>
              {intl.formatMessage({ id: "avSpeedByTypeCar3" })}{" "}
              {avSpeedByTypeCar[3].toFixed(2)}{" "}
              {intl.formatMessage({ id: "kmh" })}
            </p>
          </div>
        </div>

        <MenuIcon />
      </div>
    </div>
  );
};
