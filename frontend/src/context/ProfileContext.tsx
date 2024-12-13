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
      return {
        ...prev,
        preferences: updatedPreferences,
        personalizationScore: calculatePersonalizationScore(updatedPreferences),
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
            ...lastInteractions.viewedProducts.slice(0, 19), // Keep last 20
          ];
          break;
        case 'search':
          lastInteractions.searchQueries = [
            value,
            ...lastInteractions.searchQueries.slice(0, 9), // Keep last 10
          ];
          break;
        case 'category':
          lastInteractions.categoryInteractions[value] =
            (lastInteractions.categoryInteractions[value] || 0) + 1;
          break;
      }

      return {
        ...prev,
        lastInteractions,
        personalizationScore: calculatePersonalizationScore(prev.preferences, lastInteractions),
      };
    });
  };

  // Helper function to calculate personalization score
  const calculatePersonalizationScore = (
    preferences: UserProfile['preferences'],
    interactions?: UserProfile['lastInteractions']
  ) => {
    let score = 0;
    
    // Preference completeness
    score += preferences.favoriteStyles.length ? 0.2 : 0;
    score += preferences.preferredBrands.length ? 0.2 : 0;
    score += preferences.colorPreferences.length ? 0.2 : 0;
    
    // Interaction depth
    if (interactions) {
      score += Math.min(interactions.viewedProducts.length / 20, 1) * 0.2;
      score += Math.min(Object.keys(interactions.categoryInteractions).length / 5, 1) * 0.2;
    }
    
    return score;
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