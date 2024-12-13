import React, { useState, useRef, useEffect } from 'react';
import { Search, Camera, X } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { mockProducts } from '../../data/mockProducts';

interface SearchResult {
  id: string;
  name: string;
  brand: string;
  image: string;
}

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const { trackInteraction } = useProfile();

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim().length > 0) {
      // Simple search implementation - in real app, this would be an API call
      const searchResults = mockProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(({ id, name, brand, image }) => ({
          id,
          name,
          brand,
          image,
        }));
      setResults(searchResults);
      setIsSearching(true);
      
      // Track search interaction
      trackInteraction('search', searchQuery);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  };

  const handleImageSearch = () => {
    // Implement image search functionality
    console.log('Image search clicked');
  };

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for items, brands, and inspiration..."
          className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
          {query && (
            <button
              onClick={() => handleSearch('')}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={handleImageSearch}
            className="text-gray-400 hover:text-gray-600"
          >
            <Camera className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isSearching && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-auto">
          {results.map((result) => (
            <div
              key={result.id}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b"
              onClick={() => {
                trackInteraction('view', result.id);
                setIsSearching(false);
                setQuery('');
              }}
            >
              <img
                src={result.image}
                alt={result.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <div className="font-medium">{result.name}</div>
                <div className="text-sm text-gray-500">{result.brand}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isSearching && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border z-50 p-4 text-center text-gray-500">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}
