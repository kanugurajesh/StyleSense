import React from 'react';

interface ProductConfidenceProps {
  confidence: number;
}

export function ProductConfidence({ confidence }: ProductConfidenceProps) {
  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'bg-green-200';
    if (score >= 70) return 'bg-yellow-200';
    return 'bg-red-200';
  };

  return (
    <div className="mt-1 flex items-center gap-1">
      <div
        className={`h-2 rounded ${getConfidenceColor(confidence)}`}
        style={{ width: `${confidence}%` }}
      />
      <span className="text-xs text-gray-500">{confidence}% match</span>
    </div>
  );
}
