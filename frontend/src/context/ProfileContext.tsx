import React, { createContext, useContext, useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    favoriteStyles: string[];
    preferredBrands: string[];
    sizePreferences: {
      tops: string;
      bottoms: string;
      shoes: string;
    };
    colorPreferences: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
  personalizationScore: number; // Track how well we know the user's preferences
  lastInteractions: {
    viewedProducts: string[];
    searchQueries: string[];
    categoryInteractions: Record<string, number>;
  };
}

interface ProfileContextType {
  profile: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  updatePreferences: (preferences: Partial<UserProfile['preferences']>) => void;
  trackInteraction: (type: 'view' | 'search' | 'category', value: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const login = async (email: string, password: string) => {
    // Simulated login with more detailed profile data
    setProfile({
      name: 'John Doe',
      email: email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      preferences: {
        favoriteStyles: ['casual', 'streetwear'],
        preferredBrands: ['Nike', 'Adidas'],
        sizePreferences: {
          tops: 'M',
          bottoms: '32',
          shoes: '10',
        },
        colorPreferences: ['black', 'blue', 'white'],
        priceRange: {
          min: 20,
          max: 200,
        },
      },
      personalizationScore: 0.4, // 40% confidence in user preferences
      lastInteractions: {
        viewedProducts: [],
        searchQueries: [],
        categoryInteractions: {},
      },
    });
  };

  const logout = () => {
    setProfile(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile((prev) => prev ? { ...prev, ...data } : null);
  };

  const updatePreferences = (preferences: Partial<UserProfile['preferences']>) => {
    setProfile((prev) => {
      if (!prev) return null;
      const updatedPreferences = { ...prev.preferences, ...preferences };
      const newScore = calculatePersonalizationScore(updatedPreferences, prev.lastInteractions);
      
      return {
        ...prev,
        preferences: updatedPreferences,
        personalizationScore: newScore,
      };
    });
  };

  const trackInteraction = (type: 'view' | 'search' | 'category', value: string) => {
    setProfile((prev) => {
      if (!prev) return null;
      const lastInteractions = { ...prev.lastInteractions };

      switch (type) {
        case 'view':
          lastInteractions.viewedProducts = [
            value,
            ...lastInteractions.viewedProducts.filter((id) => id !== value).slice(0, 19),
          ];
          break;
        case 'search':
          lastInteractions.searchQueries = [
            value,
            ...lastInteractions.searchQueries.filter((q) => q !== value).slice(0, 9),
          ];
          break;
        case 'category':
          lastInteractions.categoryInteractions[value] =
            (lastInteractions.categoryInteractions[value] || 0) + 1;
          break;
      }

      const newScore = calculatePersonalizationScore(prev.preferences, lastInteractions);

      return {
        ...prev,
        lastInteractions,
        personalizationScore: newScore,
      };
    });
  };

  // Helper function to calculate personalization score
  const calculatePersonalizationScore = (
    preferences: UserProfile['preferences'],
    interactions?: UserProfile['lastInteractions']
  ) => {
    let score = 0;
    const weights = {
      styles: 0.2,
      brands: 0.15,
      colors: 0.15,
      sizes: 0.15,
      priceRange: 0.1,
      viewHistory: 0.15,
      searchHistory: 0.1,
    };
    
    // Preference completeness
    score += (preferences.favoriteStyles.length / 3) * weights.styles; // Expect at least 3 styles
    score += (preferences.preferredBrands.length / 3) * weights.brands; // Expect at least 3 brands
    score += (preferences.colorPreferences.length / 3) * weights.colors; // Expect at least 3 colors
    
    // Size preferences
    const hasSizes = Object.values(preferences.sizePreferences).filter(Boolean).length;
    score += (hasSizes / 3) * weights.sizes; // All three size types filled
    
    // Price range
    if (preferences.priceRange.min < preferences.priceRange.max) {
      score += weights.priceRange;
    }
    
    // Interaction depth
    if (interactions) {
      // View history (max 20 items)
      score += Math.min(interactions.viewedProducts.length / 20, 1) * weights.viewHistory;
      
      // Search history (max 10 searches)
      score += Math.min(interactions.searchQueries.length / 10, 1) * weights.searchHistory;
    }
    
    return Math.min(Math.max(score, 0), 1); // Ensure score is between 0 and 1
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoggedIn: !!profile,
        login,
        logout,
        updateProfile,
        updatePreferences,
        trackInteraction,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
} 