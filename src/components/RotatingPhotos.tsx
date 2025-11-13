"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  caption: string;
}

interface RotatingPhotosProps {
  photos: Photo[];
  interval?: number; // milliseconds between rotations
}

export default function RotatingPhotos({ photos, interval = 3000 }: RotatingPhotosProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [photos.length, interval]);

  if (photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div className="relative w-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-blue-50">
        <div className="relative h-full w-full">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-blue-700/80 transition-opacity duration-500">
          {currentPhoto.caption}
        </p>
      </div>
      {/* Dots indicator */}
      <div className="mt-4 flex justify-center gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-blue-600"
                : "w-1.5 bg-blue-300 hover:bg-blue-400"
            }`}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

