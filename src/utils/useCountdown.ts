import { useState, useEffect } from "preact/hooks";

const formatNumber = (n: number) => {
  const positiveNumber = Math.abs(n);

  const stringifiedNumber = positiveNumber.toString();

  if (positiveNumber < 10) {
    return stringifiedNumber.padStart(2, "0");
  }
  return stringifiedNumber;
};

const getTimeRemaining = (difference: number) => {
  const hasPassed = difference < 0;
  const seconds = formatNumber(Math.floor((difference / 1000) % 60));
  const minutes = formatNumber(Math.floor((difference / 1000 / 60) % 60));
  const hours = formatNumber(Math.floor((difference / (1000 * 60 * 60)) % 24));

  return {
    hasPassed,
    seconds,
    minutes,
    hours
  };
};

export default function useCountdown(targetDate: number) {
  const [difference, setDifference] = useState(
    targetDate - new Date().getTime()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDifference(targetDate - new Date().getTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return getTimeRemaining(difference);
}
