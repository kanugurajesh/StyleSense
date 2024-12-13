import React from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  return (
    <div className={`aspect-square overflow-hidden rounded-lg bg-gray-200 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
      />
    </div>
  );
}