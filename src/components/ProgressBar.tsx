import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  totalTime: number;
  timeLeft: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalTime, timeLeft }) => {
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((timeLeft / totalTime) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [totalTime, timeLeft]);

  return (
    <div className="relative w-full h-1 bg-gray-200 rounded overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-violet-300 transition-width duration-500"
        style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
