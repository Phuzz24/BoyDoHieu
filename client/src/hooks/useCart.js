import { useState, useEffect } from 'react';

const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      console.log('Attempting to load cart from localStorage:', storedCart);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
          console.log('Successfully loaded cart:', parsedCart);
        } else {
          console.warn('Parsed cart is not an array, resetting to empty:', parsedCart);
          setCart([]);
        }
      } else {
        console.log('No cart found in localStorage, initializing empty cart');
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setCart([]);
    }
  }, []);

  useEffect(() => {
    try {
      console.log('Saving cart to localStorage:', cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
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
        const updatedCart = prev.map((item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
        console.log('Updated cart (existing item):', updatedCart);
        return updatedCart;
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
      const updatedCart = [...prev, newItem];
      console.log('Updated cart (new item):', updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item._id !== id);
      console.log('Removed item, new cart:', updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) => {
      const updatedCart = prev.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, parseInt(quantity) || 1) } : item
      );
      console.log('Updated quantity, new cart:', updatedCart);
      return updatedCart;
    });
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.discountPrice || item.price || 0) * (item.quantity || 1),
    0
  );

  const clearCart = () => {
    setCart([]);
    console.log('Cleared cart');
  };

  return { cart, addToCart, removeFromCart, updateQuantity, total, clearCart };
};

export default useCart;