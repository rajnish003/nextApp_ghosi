"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface CardData {
  id: number;
  title: string;
  description: string;
}

const HelpCards : React.FC = () => {
  const data: CardData[] = [
    {
      id: 1,
      title: "Ghosi Help Line",
      description: "Providing emergency assistance and support for the Ghosi community."
    },
    {
      id: 2,
      title: "Medical Help",
      description: "Assisting with medical emergencies, hospital information, and financial aid for treatment."
    },
    {
      id: 3,
      title: "Job Search Help",
      description: "Connecting job seekers with employment opportunities and career resources."
    },
    {
      id: 4,
      title: "Career Guidance Help",
      description: "Providing mentorship, educational resources, and career planning support."
    },
    {
      id: 5,
      title: "Government Department Help",
      description: "Assisting with government-related services, documentation, and grievance redressal."
    },
    // {
    //   id: 6,
    //   title: "Donation for Ghosi Community",
    //   description: "Encouraging community donations to support social and educational initiatives."
    // }
  ];

  const router = useRouter();

  const handleClick = () => {
    router.push('/helpFrom');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-green-200 min-h-[80vh]">
      {data.map((card) => (
        <div
          key={card.id}
          className="bg-white shadow-xl rounded-xl p-6 border border-gray-300 hover:shadow-2xl transition-transform transform hover:scale-105 flex flex-col items-center text-center"
        >
          <h3 className="text-2xl font-bold mb-2 text-gray-800">{card.title}</h3>
          <p className="text-gray-600 mb-4">{card.description}</p>
          <button
            className="px-4 py-2 bg-green-400 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            onClick={handleClick}
          >
            Click here
          </button>
        </div>
      ))}
    </div>
  );
};

export default HelpCards;
