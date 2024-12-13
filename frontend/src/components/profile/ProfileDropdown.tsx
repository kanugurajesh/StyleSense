import React, { useState } from 'react';
import { LogOut, Settings, User, Settings2, X } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { Button } from '../ui/Button';
import { PreferencesForm } from './PreferencesForm';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
}

export function ProfileDropdown() {
  const { profile, isLoggedIn, login, logout } = useProfile();
  const [showPreferences, setShowPreferences] = useState(false);

  if (!isLoggedIn) {
    return <LoginForm onSubmit={login} />;
  }

  if (showPreferences) {
    return (
      <div className="w-96">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-medium">Style Preferences</h2>
          <Button
            variant="ghost"
            className="p-1"
            onClick={() => setShowPreferences(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <PreferencesForm />
      </div>
    );
  }

  return (
    <div className="w-64">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500" />
            </div>
          )}
          <div>
            <div className="font-medium">{profile?.name}</div>
            <div className="text-sm text-gray-500">{profile?.email}</div>
          </div>
        </div>
      </div>
      <div className="p-2">
        {profile && (
          <div className="px-2 py-1 mb-2">
            <div className="text-sm text-gray-500">Personalization Score</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${profile.personalizationScore * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-700">
                {Math.round(profile.personalizationScore * 100)}%
              </span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 p-2 mb-1"
          onClick={() => setShowPreferences(true)}
        >
          <Settings2 className="w-4 h-4" />
          Style Preferences
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 p-2 mb-1"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
} 