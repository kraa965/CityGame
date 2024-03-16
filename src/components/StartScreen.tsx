import React from 'react';

interface StartScreenProps {
  onStartGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl md:h-fit h-full">
      <div className="p-4 border-b-4">
        <h1 className="text-center text-3xl">Игра в города на время</h1>
      </div>
      <div className="p-6">
        <p>Цель: Назвать как можно больше реальных городов.</p>
        <ul className="list-disc pl-6 pt-6">
          <li>Запрещается повторение городов.</li>
          <li>
            Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту букву и игрок должен
            назвать город на букву стоящую перед ъ или ь знаком.
          </li>
          <li>
            Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается
            проигравшим
          </li>
        </ul>
      </div>
      <div className="pb-6 flex justify-center">
        <button onClick={onStartGame} className="bg-violet-600 mt-4 px-6 py-3 rounded-md mx-auto text-white">
          Начать игру
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
