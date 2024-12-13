import React, { useState, useRef } from 'react';
import { User, ShoppingBag, Heart } from 'lucide-react';
import { SearchInput } from './search/SearchInput';
import { Button } from './ui/Button';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useProfile } from '../context/ProfileContext';
import { CartDropdown } from './cart/CartDropdown';
import { FavoritesDropdown } from './favorites/FavoritesDropdown';
import { ProfileDropdown } from './profile/ProfileDropdown';
import useOnClickOutside from '../hooks/useOnClickOutside';

export function Header() {
  const { itemCount } = useCart();
  const { favoriteCount } = useFavorites();
  const { isLoggedIn, profile } = useProfile();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const favoritesRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(cartRef, () => setIsCartOpen(false));
  useOnClickOutside(favoritesRef, () => setIsFavoritesOpen(false));
  useOnClickOutside(profileRef, () => setIsProfileOpen(false));

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">StyleSense</h1>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <SearchInput />
          </div>

          <div className="flex items-center space-x-4">
            <div ref={profileRef} className="relative">
              <Button
                variant="ghost"
                className="p-2 rounded-full"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                {isLoggedIn && profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <User className="h-6 w-6" />
                )}
              </Button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border z-50">
                  <ProfileDropdown />
                </div>
              )}
            </div>

            <div ref={favoritesRef} className="relative">
              <Button
                variant="ghost"
                className="p-2 rounded-full relative"
                onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}
              >
                <Heart className="h-6 w-6" />
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoriteCount}
                  </span>
                )}
              </Button>
              {isFavoritesOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <FavoritesDropdown />
                </div>
              )}
            </div>

            <div ref={cartRef} className="relative">
              <Button
                variant="ghost"
                className="p-2 rounded-full relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingBag className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <CartDropdown />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
