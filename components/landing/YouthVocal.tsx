"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { useCardStore } from "@/_zustand/store";
import { CardData } from "@/types/card";
import Image from "next/image";

const YouthVocal: React.FC = () => {
  const { cards } = useCardStore();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardsPerSlide, setCardsPerSlide] = useState<number>(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      setCardsPerSlide(window.innerWidth < 640 ? 1 : 2);
      setCurrentIndex(0); // Reset to first card when changing cards per slide
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  // Total number of cards (scroll one card at a time)
  const totalCards = cards.length;
  // Maximum index to prevent scrolling past the last card
  const maxIndex = Math.max(0, totalCards - cardsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const getTransformValue = () => {
    // Calculate the width of one card based on the number of cards per slide
    const cardWidthPercentage = 100 / cardsPerSlide;
    return `-${currentIndex * cardWidthPercentage}%`;
  };

  const isExpanded = (id: number) => expandedId === id;

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const threshold = 50; // Minimum swipe distance to trigger slide change
    const difference = touchStartX.current - touchEndX.current;

    if (difference > threshold) {
      // Swipe left - next slide
      nextSlide();
    } else if (difference < -threshold) {
      // Swipe right - previous slide
      prevSlide();
    }

    // Reset values
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div className="relative text-center max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-white bg-gradient-to-r from-emerald-500 via-slate-700 to-emerald-800 py-3 px-6 rounded-xl shadow-md mt-8 w-fit mx-auto">
        Youth Vocal
      </h3>

      <div className="relative w-full overflow-hidden p-5">
        {/* Prev Button - hidden on mobile */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-md z-10 hover:bg-emerald-600 transition-colors sm:block hidden"
          disabled={currentIndex === 0}
        >
          ◀
        </button>

        {/* Cards Slider */}
        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${getTransformValue()})`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {cards.map((user: CardData) => (
              <div
                key={user.id}
                className="flex-shrink-0"
                style={{ width: `${100 / cardsPerSlide}%` }}
              >
                <div className="flex gap-4 px-2">
                  <div className="flex-1 flex flex-col bg-emerald-200 rounded-2xl shadow-lg p-6 text-center">
                    {/* Profile Image */}
                    <div className="w-32 h-32 mx-auto relative">
                      <Image
                        className="rounded-full border-4 border-white shadow-md object-cover"
                        src={user.image || "/default-user.png"}
                        alt={user.name || "User Profile"}
                        fill
                      />
                    </div>

                    {/* Name & Job */}
                    <div className="mt-6">
                      <p className="text-2xl font-bold text-gray-800">{user.name}</p>
                      <p className="text-sm text-emerald-700 uppercase mt-1">
                        {user.job}
                      </p>
                    </div>

                    {/* Testimonial Text */}
                    <div className="mt-4 relative bg-gray-100 p-4 rounded-xl shadow-inner flex-grow flex flex-col justify-between">
                      <FaQuoteLeft className="text-emerald-400 text-xl absolute -top-4 left-4" />
                      <p
                        className={`text-gray-700 text-sm px-2 ${
                          isExpanded(user.id)
                            ? ""
                            : "line-clamp-4 overflow-hidden text-ellipsis"
                        }`}
                      >
                        {user.text}
                      </p>
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded(user.id) ? null : user.id)
                        }
                        className="text-blue-500 text-xs mt-2 underline"
                      >
                        {isExpanded(user.id) ? "Show less" : "Read more"}
                      </button>
                      <FaQuoteRight className="text-emerald-400 text-xl absolute -bottom-4 right-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button - hidden on mobile */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-md z-10 hover:bg-emerald-600 transition-colors sm:block hidden"
          disabled={currentIndex >= maxIndex}
        >
          ▶
        </button>

        {/* Mobile indicators */}
        <div className="sm:hidden flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalCards }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-emerald-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouthVocal;