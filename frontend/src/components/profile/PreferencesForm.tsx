import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { Button } from '../ui/Button';

export function PreferencesForm() {
  const { profile, updatePreferences } = useProfile();
  const [preferences, setPreferences] = useState(profile?.preferences);

  if (!preferences) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Favorite Styles
        </label>
        <select
          multiple
          className="mt-1 block w-full rounded-md border-gray-300"
          value={preferences.favoriteStyles}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, option => option.value);
            setPreferences(prev => ({
              ...prev!,
              favoriteStyles: values,
            }));
          }}
        >
          {['casual', 'formal', 'streetwear', 'vintage', 'minimalist'].map(style => (
            <option key={style} value={style}>
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Size Preferences
        </label>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Tops"
            value={preferences.sizePreferences.tops}
            onChange={(e) =>
              setPreferences(prev => ({
                ...prev!,
                sizePreferences: {
                  ...prev!.sizePreferences,
                  tops: e.target.value,
                },
              }))
            }
            className="rounded-md border-gray-300"
          />
          {/* Similar inputs for bottoms and shoes */}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Min"
            value={preferences.priceRange.min}
            onChange={(e) =>
              setPreferences(prev => ({
                ...prev!,
                priceRange: {
                  ...prev!.priceRange,
                  min: Number(e.target.value),
                },
              }))
            }
            className="rounded-md border-gray-300"
          />
          <input
            type="number"
            placeholder="Max"
            value={preferences.priceRange.max}
            onChange={(e) =>
              setPreferences(prev => ({
                ...prev!,
                priceRange: {
                  ...prev!.priceRange,
                  max: Number(e.target.value),
                },
              }))
            }
            className="rounded-md border-gray-300"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Preferences
      </Button>
    </form>
  );
} 