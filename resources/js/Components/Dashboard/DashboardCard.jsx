import React from 'react';

function DashboardCard({ color, number, title }) {
  const cardColors = {
    consejo: 'bg-red-500',
    rectorado: 'bg-blue-500',
    asamblea: 'bg-green-500',
  };

  return (
    <div className={`w-64 h-32 mt-10 p-6 rounded-lg shadow-lg ${cardColors[color]}`}>
       <div className="flex flex-col justify-between items-center h-full text-white text-center">
        <div className="text-4xl font-bold">{number}</div>
        <div className="text-lg font-bold">{title}</div>
      </div>
    </div>
  );
}

export default DashboardCard;