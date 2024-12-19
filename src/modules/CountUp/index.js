import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const CountUp = ({ start, end }) => {
  const { t } = useTranslation();
  const [count, setCount] = useState("00:00:00");

  const startDate = useMemo(() => new Date(start * 1000), [start]);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.max(
        0,
        (end ? new Date(end * 1000) : new Date()) - startDate,
      );

      const hours = Math.floor(diff / (1000 * 60 * 60)); // Часы
      const minutes = Math.floor((diff / (1000 * 60)) % 60); // Минуты
      const seconds = Math.floor((diff / 1000) % 60); // Секунды

      const time = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`;

      setCount(time);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, end]);

  if (!start) {
    return t("visitors.all.notStarted");
  }

  return (
    <div>
      <span>{count}</span>
    </div>
  );
};

export default CountUp;
