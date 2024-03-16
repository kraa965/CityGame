import React from 'react';
import CityGame from './CityGame';
import citiesData from '../db/data.json';

interface ChatContainerProps {
  gameStarted: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ gameStarted }) => {
  const cities = citiesData.cities;
  return (
    <div className="max-w-xl md:w-5/6 md:h-fit h-full w-full">
      <CityGame cities={cities} gameStarted={gameStarted} />
    </div>
  );
};

export default ChatContainer;
