import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";

const SaleCountdown = ({ saleEndTime }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!saleEndTime) return;

    const calculateTimeLeft = () => {
      try {
        const end = new Date(saleEndTime);
        if (isNaN(end.getTime())) return "";

        const now = new Date();
        const difference = end - now;

        if (difference <= 0) return "SALE ENDED";

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } catch (err) {
        return "";
      }
    };

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining === "SALE ENDED") clearInterval(timer);
    }, 1000);

    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, [saleEndTime]);

  if (!saleEndTime || !timeLeft || timeLeft === "SALE ENDED") return null;

  return (
    <div className="absolute top-2 right-2 bg-blue-600/90 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded z-10 flex items-center gap-1.5 shadow-lg border border-blue-400/30">
      <FaClock className="animate-pulse" />
      <span className="tracking-widest uppercase">Ends In: {timeLeft}</span>
    </div>
  );
};

export default React.memo(SaleCountdown);
