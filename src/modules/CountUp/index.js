import React, { useEffect, useMemo, useState } from "react";

const CountUp = ({ start, end }) => {
  const [count, setCount] = useState("00:00:00");

  const startDate = useMemo(() => new Date(start * 1000), [start]);

  // get the difference in milliseconds between the two dates and show time period in minutes and seconds

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = (end ? new Date(end * 1000) : new Date()) - startDate;
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor(minutes / 60);
      const seconds = Math.floor((diff / 1000) % 60);

      // format the time 00 : 00 : 00
      const time = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`;

      setCount((prev) => {
        return time;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, end]);

  if (!start) {
    return null;
  }

  return (
    <div>
      <span>{count}</span>
    </div>
  );
};

export default CountUp;
