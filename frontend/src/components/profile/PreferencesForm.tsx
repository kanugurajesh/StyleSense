import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';

// Color options with their hex values
const colorOptions = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Navy', value: '#000080' },
  { name: 'Gray', value: '#808080' },
  { name: 'Beige', value: '#F5F5DC' },
  { name: 'Brown', value: '#8B4513' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Green', value: '#008000' },
];

export function PreferencesForm() {
  const { profile, updatePreferences } = useProfile();
  const [preferences, setPreferences] = useState(profile?.preferences);
  const [activeTab, setActiveTab] = useState<'style' | 'size' | 'colors'>('style');

  if (!preferences) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences(preferences);
  };

  const tabs = [
    { id: 'style', label: 'Style & Brands' },
    { id: 'size', label: 'Sizes' },
    { id: 'colors', label: 'Colors' },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {/* Tabs */}
      <div className="flex space-x-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`px-4 py-2 -mb-px ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Style & Brands Tab */}
      {activeTab === 'style' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Favorite Styles
            </label>
            <select
              multiple
              className="mt-1 block w-full rounded-md border-gray-300 min-h-[120px]"
              value={preferences.favoriteStyles}
              onChange={(e) => {
                const values = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setPreferences((prev) => ({
                  ...prev!,
                  favoriteStyles: values,
                }));
              }}
            >
              {[
                'casual',
                'formal',
                'streetwear',
                'vintage',
                'minimalist',
                'bohemian',
                'preppy',
                'athletic',
              ].map((style) => (
                <option key={style} value={style}>
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Brands
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {preferences.preferredBrands.map((brand) => (
                <span
                  key={brand}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
                >
                  {brand}
                  <button
                    type="button"
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev!,
                        preferredBrands: prev!.preferredBrands.filter(
                          (b) => b !== brand
                        ),
                      }))
                    }
                    className="ml-2"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price Range (USD)
            </label>
            <div className="mt-2">
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={preferences.priceRange.min}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev!,
                      priceRange: {
                        ...prev!.priceRange,
                        min: Number(e.target.value),
                      },
                    }))
                  }
                  className="flex-1"
                />
                <span className="w-16 text-sm">
                  ${preferences.priceRange.min}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={preferences.priceRange.max}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev!,
                      priceRange: {
                        ...prev!.priceRange,
                        max: Number(e.target.value),
                      },
                    }))
                  }
                  className="flex-1"
                />
                <span className="w-16 text-sm">
                  ${preferences.priceRange.max}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Sizes Tab */}
      {activeTab === 'size' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tops Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`p-2 text-sm border rounded ${
                    preferences.sizePreferences.tops === size
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                  onClick={() =>
                    setPreferences((prev) => ({
                      ...prev!,
                      sizePreferences: {
                        ...prev!.sizePreferences,
                        tops: size,
                      },
                    }))
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bottoms Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }, (_, i) => (28 + i * 2).toString()).map(
                (size) => (
                  <button
                    key={size}
                    type="button"
                    className={`p-2 text-sm border rounded ${
                      preferences.sizePreferences.bottoms === size
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev!,
                        sizePreferences: {
                          ...prev!.sizePreferences,
                          bottoms: size,
                        },
                      }))
                    }
                  >
                    {size}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shoe Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }, (_, i) => (6 + i * 0.5).toFixed(1)).map(
                (size) => (
                  <button
                    key={size}
                    type="button"
                    className={`p-2 text-sm border rounded ${
                      preferences.sizePreferences.shoes === size
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev!,
                        sizePreferences: {
                          ...prev!.sizePreferences,
                          shoes: size,
                        },
                      }))
                    }
                  >
                    {size}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Colors Tab */}
      {activeTab === 'colors' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Colors
          </label>
          <div className="grid grid-cols-3 gap-4">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                className={`flex items-center gap-2 p-2 rounded border ${
                  preferences.colorPreferences.includes(color.name.toLowerCase())
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
                }`}
                onClick={() => {
                  const colorName = color.name.toLowerCase();
                  setPreferences((prev) => ({
                    ...prev!,
                    colorPreferences: preferences.colorPreferences.includes(
                      colorName
                    )
                      ? preferences.colorPreferences.filter((c) => c !== colorName)
                      : [...preferences.colorPreferences, colorName],
                  }));
                }}
              >
                <span
                  className="w-6 h-6 rounded border border-gray-300"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-sm">{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <Button type="submit" className="w-full mt-6">
        Save Preferences
      </Button>
    </form>
  );
} 