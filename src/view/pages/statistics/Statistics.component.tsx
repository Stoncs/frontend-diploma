import { AxiosError } from "axios";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { useNavigate, useParams } from "react-router";
import { getEventsDevice } from "~/http/api";
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
  const [events, setEvents] = React.useState<IEvent[]>([]);
  const [averageSpeedData, setAverageSpeedData] = React.useState<number[]>([]);
  const [typeCarData, setTypeCarData] = React.useState<Array<number[]>>([]);
  const [typeEventData, setTypeEventData] = React.useState<Array<number[]>>([]);
  const { key: keyDevice } = useParams();
  const navigate = useNavigate();
  const labels = Array.from({ length: 24 }, (_, i) => i + 1);
  const dataBarEventType = {
    labels,
    datasets: [
      {
        label: "Проезд",
        data: typeCarData.map((hour) => hour[0]),
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
      {
        label: "Превышение скорости",
        data: typeCarData.map((hour) => hour[1]),
        backgroundColor: "rgb(75, 192, 192)",
        stack: "Stack 1",
      },
      {
        label: "Проезд перед пешеходом",
        data: typeCarData.map((hour) => hour[2]),
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
  const fetchEvents = async () => {
    try {
      // Пользователь имеет доступ только к своим камерам
      const data = await getEventsDevice(keyDevice!);
      const dataForTypeCar = Array.from({ length: 24 }, () => Array(4).fill(0));
      const dataForEverageSpeed = Array.from({ length: 24 }, () =>
        Array(2).fill(0)
      );
      const dataForTypeEvent = Array.from({ length: 24 }, () =>
        Array(3).fill(0)
      );
      for (const event of data) {
        let time = Number(event.time.split(" ")[1].split(":")[0]);
        let typeCar = Number(event.typeOfCar);
        let typeEvent = Number(event.typeOfEvent);
        dataForTypeCar[time][typeCar]++;
        dataForEverageSpeed[time][0] =
          dataForEverageSpeed[time][0] + Number(event.speed);
        dataForEverageSpeed[time][1]++;
        dataForTypeEvent[time][typeEvent]++;
      }
      setEvents(data);
      setAverageSpeedData(dataForEverageSpeed.map((hour) => hour[0] / hour[1]));
      setTypeCarData(dataForTypeCar);
      setTypeEventData(dataForTypeEvent);
      // console.log(dataForTypeCar);
      // console.log(dataForTypeCar);
      // console.log(dataForTypeEvent);
      console.log(dataForEverageSpeed.map((hour) => hour[0] / hour[1]));
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
  return (
    <div className={styles.container}>
      <div className={styles.statistics_window}>
        <div className={styles.statistics_window__top}>
          <h1>Статистика {keyDevice}</h1>
          <div className={styles.statistics_window__control}>
            <div className={styles.block_control}>
              <input type="date" name="nameDevice" />
              <button className={styles.button_in_block}>Ввести дату</button>
              <button
                className={styles.button_in_block}
                onClick={() => navigate(EVENTS_ROUTE.slice(0, -4) + keyDevice)}
              >
                События
              </button>
            </div>
          </div>
          <div className={styles.charts}>
            <Bar
              data={dataBarEventType}
              options={options1}
              height="200px"
              width="600px"
            />

            <Bar
              data={dataBarCarType}
              options={options2}
              height="200px"
              width="600px"
            />

            <Line
              data={dataLineAverageSpeed}
              options={options3}
              height="200px"
              width="600px"
            />
          </div>
        </div>

        <MenuIcon />
      </div>
    </div>
  );
};
