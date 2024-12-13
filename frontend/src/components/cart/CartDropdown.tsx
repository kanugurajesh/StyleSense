import React from 'react';
import { X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

export function CartDropdown() {
  const { items, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">Your cart is empty</div>
    );
  }

  return (
    <div className="w-80 max-h-96 overflow-auto">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 p-4 border-b">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="text-sm font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
          </div>
          <Button
            variant="ghost"
            className="p-1"
            onClick={() => removeFromCart(item.id)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <div className="p-4 border-t">
        <div className="flex justify-between mb-4">
          <span>Total:</span>
          <span className="font-medium">${total.toFixed(2)}</span>
        </div>
        <Button className="w-full">Checkout</Button>
      </div>
    </div>
  );
}
