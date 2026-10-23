import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { products } from './data/catalog';

const CartContext = createContext(null);
const CART_KEY = 'farm-cart';

function readCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!Array.isArray(stored)) return [];
    return stored
      .map((row) => ({
        id: Number(row.id),
        qty: Math.max(1, Math.min(99, Number(row.qty) || 1)),
      }))
      .filter((row) => products.some((product) => product.id === row.id));
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function parsePrice(price) {
  return Number(String(price).replace(/,/g, '')) || 0;
}

export function formatMoney(amount) {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    writeCart(items);
  }, [items]);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === CART_KEY) setItems(readCart());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setQty = useCallback((id, qty) => {
    const nextQty = Math.max(0, Math.min(99, Number(qty) || 0));
    setItems((current) => {
      if (nextQty <= 0) return current.filter((row) => row.id !== id);
      const exists = current.some((row) => row.id === id);
      if (!exists) return [...current, { id, qty: nextQty }];
      return current.map((row) => (row.id === id ? { ...row, qty: nextQty } : row));
    });
  }, []);

  const addItem = useCallback((id, amount = 1) => {
    setItems((current) => {
      const found = current.find((row) => row.id === id);
      if (!found) return [...current, { id, qty: Math.max(1, amount) }];
      return current.map((row) =>
        row.id === id ? { ...row, qty: Math.min(99, row.qty + Math.max(1, amount)) } : row,
      );
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((row) => row.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getQty = useCallback(
    (id) => items.find((row) => row.id === id)?.qty || 0,
    [items],
  );

  const lines = useMemo(
    () =>
      items
        .map((row) => {
          const product = products.find((item) => item.id === row.id);
          if (!product) return null;
          const unit = parsePrice(product.price);
          return {
            ...row,
            product,
            unit,
            lineTotal: unit * row.qty,
          };
        })
        .filter(Boolean),
    [items],
  );

  const count = useMemo(() => items.reduce((sum, row) => sum + row.qty, 0), [items]);
  const subtotal = useMemo(() => lines.reduce((sum, row) => sum + row.lineTotal, 0), [lines]);

  const value = useMemo(
    () => ({
      items,
      lines,
      count,
      subtotal,
      getQty,
      addItem,
      setQty,
      removeItem,
      clearCart,
    }),
    [items, lines, count, subtotal, getQty, addItem, setQty, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
