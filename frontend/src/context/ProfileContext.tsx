import React, { createContext, useContext, useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}

interface ProfileContextType {
  profile: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const login = async (email: string, password: string) => {
    // In a real app, you would make an API call here
    // For now, we'll simulate a successful login
    setProfile({
      name: 'John Doe',
      email: email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    });
  };

  const logout = () => {
    setProfile(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile((prev) => prev ? { ...prev, ...data } : null);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoggedIn: !!profile,
        login,
        logout,
        updateProfile,
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