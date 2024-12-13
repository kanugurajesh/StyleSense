import React from 'react';
import { Search, Camera } from 'lucide-react';

export function SearchInput() {
  const handleImageSearch = () => {
    // Implement image search functionality
    console.log('Image search clicked');
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for items, brands, and inspiration..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <button 
        onClick={handleImageSearch}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <Camera className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      </button>
    </div>
  );
}