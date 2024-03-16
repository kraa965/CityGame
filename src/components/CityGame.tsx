import React, { useEffect, useRef, useState } from 'react';
import svgbutton from '../assets/svgbutton.svg';
import ProgressBar from './ProgressBar';
import GameStats from './GameStats.tsx';

interface CityGameProps {
  cities: string[];
  gameStarted: boolean;
}

interface ChatMessage {
  text: string;
  isPlayer: boolean;
}

const CityGame: React.FC<CityGameProps> = ({ cities, gameStarted }) => {
  const [inputValue, setInputValue] = useState('');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [currentCity, setCurrentCity] = useState<string>('');
  const [lastLetter, setLastLetter] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(120); // 120 seconds = 2 minutes
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('');
  const [botShouldPlay, setBotShouldPlay] = useState<boolean>(true);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeLeft(120);
  }, [currentCity, gameStarted]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      // Проверка последнего сообщения в чате и определение победителя
      const lastMessage = chat[chat.length - 1];
      if (lastMessage && lastMessage.isPlayer) {
        setWinner('player');
      } else {
        setWinner('bot');
      }
      setGameEnded(true);
    }

    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, lastLetter, cities, chat]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    const enteredCity = inputValue.trim();

    if (!currentCity || enteredCity.charAt(0) === lastLetter) {
      if (cities.includes(enteredCity)) {
        if (chat.some((message) => message.text === enteredCity)) {
          addToChat('Этот город уже был использован, попробуйте другой!', false);
          setInputValue('');
          return;
        }

        setCurrentCity(enteredCity);
        let lastLetterOfEnteredCity = enteredCity.charAt(enteredCity.length - 1).toUpperCase();
        if (endsWithInvalidLetter(enteredCity)) {
          lastLetterOfEnteredCity = enteredCity.charAt(enteredCity.length - 2).toUpperCase();
        }
        setLastLetter(lastLetterOfEnteredCity);
        setInputValue('');
        addToChat(enteredCity, true);
        setIsPlayerTurn(false);
        setTimeout(() => botTurn(lastLetterOfEnteredCity), Math.floor(Math.random() * 30000));
      } else {
        addToChat('Город не найден в списке!', true);
      }
    } else {
      addToChat('Некорректный город!', true);
    }
  };

  const botTurn = (letter: string) => {
    if (!botShouldPlay) return;
    const filteredCities = cities.filter((city) => {
      const lastChar = city.charAt(city.length - 1).toLowerCase();
      return (
        city.charAt(0).toUpperCase() === letter &&
        city.toUpperCase() !== currentCity &&
        !endsWithInvalidLetter(city) &&
        !['ь', 'ъ'].includes(lastChar)
      );
    });

    if (filteredCities.length === 0) {
      setWinner('player');
      addToChat('Победа! Бот не знает городов на вашу букву.', false);
      setGameEnded(true);
      return;
    }

    const botCity = filteredCities[Math.floor(Math.random() * filteredCities.length)];
    setCurrentCity(botCity);
    setLastLetter(botCity.charAt(botCity.length - 1).toUpperCase());
    addToChat(botCity, false);
    setIsPlayerTurn(true);
  };

  useEffect(() => {
    if (gameEnded) {
      setBotShouldPlay(false);
    }
  }, [gameEnded]);

  const endsWithInvalidLetter = (city: string) => {
    const lastChar = city.charAt(city.length - 1).toLowerCase();
    return ['ь', 'ъ', 'ы', 'й'].includes(lastChar);
  };

  const addToChat = (message: string, isPlayer: boolean) => {
    setChat((prevChat) => [...prevChat, { text: message, isPlayer }]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  useEffect(() => {
    if (chat.length === 0) {
      setPlaceholder('Напишите любой город, например: Москва');
    } else if (gameStarted && !isPlayerTurn) {
      setPlaceholder('Ожидаем ответа соперника...');
    } else {
      setPlaceholder(`Знаете город на букву "${lastLetter}"?`);
    }
  }, [gameStarted, isPlayerTurn, lastLetter]);

  return (
    <>
      {!gameEnded ? (
        <div className="bg-white rounded-2xl h-full flex flex-col">
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-4 flex justify-between">
              <p className="font-semibold">{isPlayerTurn ? 'Сейчас ваша очередь' : 'Сейчас ход бота'}</p>
              <p className="text-lg font-bold">{formatTime(timeLeft)}</p>
            </div>
            <ProgressBar totalTime={120} timeLeft={timeLeft} />
            <div className="overflow-y-auto flex-1 p-4" ref={chatContainerRef}>
              {chat.length === 0 ? (
                <p className="flex justify-center items-center text-gray-400 md:h-[400px] h-full">
                  Первый участник вспоминает города...
                </p>
              ) : (
                <div className="overflow-y-auto md:h-[400px] h-full">
                  {chat.map((message, index) => (
                    <div key={index} className="relative flex flex-col">
                      <p
                        className={`mb-[5px] px-2.5 py-[5px] rounded-t-xl  ${
                          message.isPlayer
                            ? 'self-end bg-violet-500 rounded-l-xl text-white'
                            : 'self-start bg-gray-300 rounded-r-xl text-black'
                        }`}>
                        {message.text}
                      </p>
                    </div>
                  ))}
                  <div ref={chatEndRef}></div>
                </div>
              )}
            </div>
            <div className={`${chat.length === 0 ? 'hidden' : 'block'} text-gray-400 mx-auto`}>
              Всего перечислено городов: {chat.length}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex p-4">
            <input
              className="w-full text-base p-2.5 bg-gray-100 rounded-l-md"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
            />
            <button type="submit" className="flex items-center justify-center bg-gray-100 rounded-r-md">
              <img src={svgbutton} alt={svgbutton} />
            </button>
          </form>
        </div>
      ) : (
        <GameStats winner={winner} totalCities={chat.length} lastCity={currentCity} />
      )}
    </>
  );
};

export default CityGame;
