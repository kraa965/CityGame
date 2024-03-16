import React, { useState } from 'react';
import ChatContainer from './components/ChatContainer';
import StartScreen from './components/StartScreen';

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-bgColor">
      {gameStarted ? <ChatContainer gameStarted={gameStarted} /> : <StartScreen onStartGame={startGame} />}
    </div>
  );
};

export default App;

/*import React, { useEffect, useState } from 'react';

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
    <div className="relative w-full h-4 bg-gray-200 rounded overflow-hidden">
      <div className="absolute top-0 left-0 h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

const TimerWithProgressBar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(60); // 60 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4 text-red-600">Timer: {timeLeft}</h1>
      <ProgressBar totalTime={60} timeLeft={timeLeft} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <TimerWithProgressBar />
    </div>
  );
};

export default App;*/
