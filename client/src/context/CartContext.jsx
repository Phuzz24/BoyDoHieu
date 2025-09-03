import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart saved to localStorage:', cart);
  }, [cart]);

  const addToCart = (product) => {
    console.log('Received product for addToCart:', product);
    if (!product || !product._id || !product.name || !product.brand || !product.price) {
      console.error('Invalid product data for addToCart:', product);
      return;
    }
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
      );
      if (existing) {
        return prev.map((item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      }
      const newItem = {
        _id: product._id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        discountPrice: product.discountPrice || null,
        images: product.images || [],
        selectedSize: product.selectedSize || null,
        selectedColor: product.selectedColor || null,
        quantity: 1,
      };
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id, selectedSize, selectedColor) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item._id === id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );
  };

  const updateQuantity = (id, selectedSize, selectedColor, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity: Math.max(1, parseInt(quantity) || 1) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.discountPrice || item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, total, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);