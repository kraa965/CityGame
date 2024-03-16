import React from 'react';

interface GameStatsProps {
  winner: string;
  totalCities: number;
  lastCity: string;
}

const GameStats: React.FC<GameStatsProps> = ({ winner, totalCities, lastCity }) => {
  let time = '00:00';

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl md:h-fit h-full text-center py-10 text-lg">
      {winner === 'player' ? (
        <div>
          <p>Поздравляем тебя с победой!</p>
          <p>Твой противник не вспомнил нужный город!</p>
          <h2 className="my-8 text-green-500 font-semibold text-2xl">{time}</h2>
        </div>
      ) : (
        <div>
          <p>К сожалению, твое время вышло!</p>
          <p>Твой противник победил!</p>
          <h2 className="my-8 text-red-500 font-semibold text-2xl">{time}</h2>
        </div>
      )}
      <div className="pb-8">
        <p>Всего перечислено городов: {totalCities}</p>
        {totalCities < 10 ? <p>Плохой результат</p> : <p>Очень не плохой результат</p>}
      </div>
      <div className="pb-8">
        <p>Последний город названный победителем</p>
        <p className="font-semibold text-2xl">{lastCity}</p>
      </div>
      <button
        className="bg-violet-600 mt-4 px-6 py-3 rounded-md mx-auto text-white"
        onClick={() => {
          location.reload();
        }}>
        Начать новую игру
      </button>
    </div>
  );
};

export default GameStats;
