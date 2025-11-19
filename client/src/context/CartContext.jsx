// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Cart saved to localStorage:', cart);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (product) => {
    if (!product || !product._id || !product.name || !product.brand || !product.price) {
      console.error('Invalid product data for addToCart:', product);
      return;
    }
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item._id === product._id &&
          (item.selectedSize === product.selectedSize || (!item.selectedSize && !product.selectedSize)) &&
          (item.selectedColor === product.selectedColor || (!item.selectedColor && !product.selectedColor))
      );
      if (existing) {
        return prev.map((item) =>
          item._id === product._id &&
          (item.selectedSize === product.selectedSize || (!item.selectedSize && !product.selectedSize)) &&
          (item.selectedColor === product.selectedColor || (!item.selectedColor && !product.selectedColor))
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      const newItem = {
        _id: product._id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        discountPrice: product.discountPrice || null,
        images: Array.isArray(product.images) ? product.images : [product.image || 'https://via.placeholder.com/100'],
        selectedSize: product.selectedSize || null,
        selectedColor: product.selectedColor || null,
        quantity: 1,
      };
      console.log('New item added to cart:', newItem);
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id, selectedSize, selectedColor) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          item._id !== id ||
          (item.selectedSize !== selectedSize && (item.selectedSize || selectedSize)) ||
          (item.selectedColor !== selectedColor && (item.selectedColor || selectedColor))
      )
    );
  };

  const updateQuantity = (id, selectedSize, selectedColor, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item._id === id &&
        (item.selectedSize === selectedSize || (!item.selectedSize && !selectedSize)) &&
        (item.selectedColor === selectedColor || (!item.selectedColor && !selectedColor))
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + (item.discountPrice || item.price || 0) * (item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);