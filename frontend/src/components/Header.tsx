import React, { useState, useRef } from 'react';
import { User, ShoppingBag } from 'lucide-react';
import { SearchInput } from './search/SearchInput';
import { Button } from './ui/Button';
import { useCart } from '../context/CartContext';
import { CartDropdown } from './cart/CartDropdown';
import useOnClickOutside from '../hooks/useOnClickOutside';

export function Header() {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(cartRef, () => setIsCartOpen(false));

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
            <Button variant="ghost" className="p-2 rounded-full">
              <User className="h-6 w-6" />
            </Button>
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