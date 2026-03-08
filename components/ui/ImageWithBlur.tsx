'use client';

import NextImage from 'next/image';
import { useState } from 'react';

interface ImageWithBlurProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export default function ImageWithBlur({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill,
}: ImageWithBlurProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative overflow-hidden w-full h-full">
      <NextImage
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        className={`${className ?? ''} duration-700 ease-in-out ${
          isLoading ? 'scale-110 blur-xl' : 'scale-100 blur-0'
        }`}
        onLoad={() => setLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}