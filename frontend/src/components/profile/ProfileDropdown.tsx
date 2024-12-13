import React, { useState } from 'react';
import { LogOut, Settings, User } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { Button } from '../ui/Button';

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

  if (!isLoggedIn) {
    return <LoginForm onSubmit={login} />;
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