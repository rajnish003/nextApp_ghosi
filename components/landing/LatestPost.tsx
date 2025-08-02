"use client";

import React from 'react';

interface PostItem {
  text: string;
  link: string;
  imgSrc: string;
}

const LatestPost: React.FC = () => {
  const postItems: PostItem[] = [
    {
      text: 'Welcome to Ghoshi community',
      link: '',
      imgSrc: '/images/new-gif-image.gif',
    },
    {
      text: 'बहुत जल्द घोसी बिरादरी के कार्यक्रमों की सूचना इस वेबसाइट पर मिलेगी',
      link: '',
      imgSrc: '/images/new-gif-image.gif',
    },
  ];

  return (
    <div className="flex">
      <div className="w-[160px] text-xl bg-yellow-300 pt-1 px-2">
        <h5 className="font-bold text-red-500">Latest Post</h5>
      </div>

      <div className="relative bg-gray-800 text-white py-2 overflow-hidden w-full">
        <div className="whitespace-nowrap animate-scroll hover:paused text-sm">
          {postItems.map((item, index) => (
            <span key={index} className="inline-flex items-center space-x-2 px-2">
              <a
                href={item.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {item.text}
              </a>

              {/* Uncomment below line if you want to show the gif icon */}
              {/* <Image src={item.imgSrc} alt="new" width={24} height={24} className="inline-block" /> */}

              {index !== postItems.length - 1 && <span>|</span>}
            </span>
          ))}
        </div>

        <style>
          {`
            .animate-scroll {
              animation: marquee 20s linear infinite;
              animation-play-state: running;
            }

            .animate-scroll:hover {
              animation-play-state: paused;
            }

            @keyframes marquee {
              0% {
                transform: translateX(100%);
              }
              100% {
                transform: translateX(-100%);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default LatestPost;
