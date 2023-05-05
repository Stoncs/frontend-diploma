import { AxiosError } from "axios";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { useNavigate, useParams } from "react-router";
import {
  getAverageSpeedPerHour,
  getEventsDevice,
  getTypeOfCarPerHour,
  getTypeOfEventPerHour,
} from "~/http/api";
import { EVENTS_ROUTE, LOGIN_ROUTE } from "~/utils/consts";
import { MenuIcon } from "~/view/components/menuIcon/MenuIcon.component";

import styles from "./statistics.scss";

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
import { Chart } from "react-chartjs-2";
import moment from "moment";

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

interface IEvent {
  id: number;
  carId: string;
  speed: string;
  time: string;
  typeOfCar: string;
  typeOfEvent: string;
}

export const Statistics = () => {
  // Все камеры
  const [averageSpeedData, setAverageSpeedData] = React.useState<number[]>([]);
  const [typeCarData, setTypeCarData] = React.useState<Array<number[]>>([]);
  const [typeEventData, setTypeEventData] = React.useState<Array<number[]>>([]);
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
  const { key: keyDevice } = useParams();
  const navigate = useNavigate();
  const labels = Array.from({ length: 24 }, (_, i) => i + 1);
  const dataBarEventType = {
    labels,
    datasets: [
      {
        label: "Проезд",
        data: typeEventData.map((hour) => hour[0]),
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
      {
        label: "Превышение скорости",
        data: typeEventData.map((hour) => hour[1]),
        backgroundColor: "rgb(75, 192, 192)",
        stack: "Stack 1",
      },
      {
        label: "Проезд перед пешеходом",
        data: typeEventData.map((hour) => hour[2]),
        backgroundColor: "rgb(53, 162, 235)",
        stack: "Stack 2",
      },
    ],
  };
  const dataBarCarType = {
    labels,
    datasets: [
      {
        label: "Легковая",
        data: typeCarData.map((hour) => hour[0]),
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
      {
        label: "Грузовая",
        data: typeCarData.map((hour) => hour[1]),
        backgroundColor: "rgb(75, 192, 192)",
        stack: "Stack 1",
      },
      {
        label: "Спец.транспорт",
        data: typeCarData.map((hour) => hour[2]),
        backgroundColor: "rgb(53, 162, 235)",
        stack: "Stack 2",
      },
      {
        label: "Автобус",
        data: typeCarData.map((hour) => hour[3]),
        backgroundColor: "rgb(64, 227, 68)",
        stack: "Stack 3",
      },
    ],
  };
  const dataLineAverageSpeed = {
    labels,
    datasets: [
      {
        label: "Средняя скорость",
        data: averageSpeedData.map((hour) => hour),
        backgroundColor: "rgb(64, 227, 68)",
      },
    ],
  };
  const options1 = {
    plugins: {
      title: {
        display: true,
        text: "Типы событий",
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
        text: "Типы автомобилей",
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
        text: "Средняя скорость",
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

  const fetchEvents = async () => {
    try {
      const dataForTypeCar = Array.from({ length: 24 }, () => Array(4).fill(0));
      const dataForTypeEvent = Array.from({ length: 24 }, () =>
        Array(3).fill(0)
      );

      const splitDate = date.split("-");
      const year = +splitDate[0];
      const month = +splitDate[1];
      const day = +splitDate[2];

      const avSpeed = await getAverageSpeedPerHour(year, month, day, 23);
      const typesCar = await getTypeOfCarPerHour(year, month, day, 23);
      const typesEvent = await getTypeOfEventPerHour(year, month, day, 23);

      // Подготовка информации о типах машин для графика
      let hour = 0;
      for (const obj of typesCar) {
        for (let i = 0; i < 4; i++) {
          obj[i]
            ? (dataForTypeCar[hour][i] = obj[i])
            : (dataForTypeCar[hour][i] = 0);
        }
        hour++;
      }
      // Подготовка информации о типах события для графика
      hour = 0;
      for (const obj of typesEvent) {
        for (let i = 0; i < 3; i++) {
          obj[i]
            ? (dataForTypeEvent[hour][i] = obj[i])
            : (dataForTypeEvent[hour][i] = 0);
        }
        hour++;
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
    fetchEvents();
  }, [date]);

  return (
    <div className={styles.container}>
      <div className={styles.statistics_window}>
        <div className={styles.statistics_window__top}>
          <h1>Статистика {keyDevice}</h1>
          <div className={styles.statistics_window__control}>
            <div className={styles.block_control}>
              <select
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
                <input
                  type="date"
                  value={date}
                  onChange={(e) => onChangeDate(e, "date")}
                />
              ) : (
                <>
                  <input
                    type="date"
                    value={date1}
                    onChange={(e) => onChangeDate(e, "date1")}
                  />
                  <input
                    type="date"
                    value={date2}
                    onChange={(e) => onChangeDate(e, "date2")}
                  />
                  <button className={styles.button_in_block}>
                    Посмотреть статистику
                  </button>
                </>
              )}

              <button
                className={styles.button_in_block}
                onClick={() => navigate(EVENTS_ROUTE.slice(0, -4) + keyDevice)}
              >
                События
              </button>
            </div>
          </div>
        </div>
        <div className={styles.charts}>
          <Bar data={dataBarEventType} options={options1} />

          <Bar data={dataBarCarType} options={options2} />

          <Line data={dataLineAverageSpeed} options={options3} />
        </div>
        <MenuIcon />
      </div>
    </div>
  );
};
