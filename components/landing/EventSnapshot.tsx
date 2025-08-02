"use client";
import { Card, CardContent } from "@/components/ui/card";
import * as React from "react";
import { useEffect, useState } from "react"; 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from 'next/image';

export function EventSnapshot() {
  const [isMobile, setIsMobile] = useState(false);
  const images = [
    { src: "/EventSnapshot/fImage1.jpg", alt: "Image 1" },
    { src: "/EventSnapshot/fimage2.jpg", alt: "Image 2" },
    { src: "/EventSnapshot/img3.jpg", alt: "Image 3" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // 640px is Tailwind's 'sm' breakpoint
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="w-full flex flex-col items-center py-10 px-4 bg-gradient-to-r from-emerald-100 via-[#f0f9ff] to-emerald-100">
      {/* ===== Event Snapshot Heading ===== */}
      <div className="text-center mb-10 group">
        <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg relative inline-block">
          <span className="relative z-10 px-2 py-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
            Event Snapshot
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-200 to-teal-100 rounded-full blur-md group-hover:blur-lg transition-all duration-300 ease-in-out opacity-70 group-hover:opacity-90"></span>
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed transition-colors duration-300 hover:text-gray-900">
          Discover moments captured from our recent events, highlighting the enthusiasm, energy, and engagement of our vibrant community.
        </p>
      </div>

      {/* ===== Carousel Section ===== */}
        <Carousel
        opts={{
          align: "center",
        }}
        className="w-full max-w-7xl"
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 lg:basis-1/3 px-2"
            >
              <Card className="h-full flex items-center justify-center bg-emerald-300 cursor-pointer transition-transform transform hover:scale-105 shadow-lg rounded-xl">
                <CardContent className="flex aspect-square items-center justify-center p-4">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Only render arrows if not mobile */}
        {!isMobile && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
}