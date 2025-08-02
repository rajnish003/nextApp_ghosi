'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselItem {
  id: number;
  src: string;
  alt: string;
}

export default function Hero_carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const carouselItems: CarouselItem[] = [
    { id: 1, src: '/image/gimgupd1.jpg', alt: 'First slide' },
    { id: 2, src: '/image/gimg2.jpg', alt: 'Second slide' },
    { id: 3, src: '/image/gimg3.jpg', alt: 'Third slide' },
    { id: 4, src: '/image/gimg4.jpg', alt: 'Fourth slide' },
    { id: 5, src: '/image/gimg5.jpg', alt: 'Fifth slide' },
    { id: 6, src: '/image/gimg6.jpg', alt: 'Sixth slide' },
  ];

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselItems.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Optionally restart auto-play after manual interaction
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => 
      (prev + 1) % carouselItems.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div className="relative w-full mx-auto group h-full">
      {/* Carousel wrapper */}
      <div className="relative h-100 overflow-hidden rounded-lg md:h-120">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              priority={index === currentSlide}
            />
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-[#020101] w-6' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#000]/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white/70 group-focus:outline-none transition-all">
          <svg
            className="w-4 h-4 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToNextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white/70 group-focus:outline-none transition-all">
          <svg
            className="w-4 h-4 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}