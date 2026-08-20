import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductId } from "../data/products";

const STORAGE_KEY = "aura-cart";

export type CartLine = { id: ProductId; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (id: ProductId) => void;
  setQty: (id: ProductId, qty: number) => void;
  remove: (id: ProductId) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStored(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) => line && typeof line.id === "string" && Number(line.qty) > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readStored);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const add = useCallback((id: ProductId) => {
    setLines((current) => {
      const found = current.find((line) => line.id === id);
      if (found) {
        return current.map((line) =>
          line.id === id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...current, { id, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((id: ProductId, qty: number) => {
    setLines((current) => {
      if (qty <= 0) return current.filter((line) => line.id !== id);
      return current.map((line) => (line.id === id ? { ...line, qty } : line));
    });
  }, []);

  const remove = useCallback((id: ProductId) => {
    setLines((current) => current.filter((line) => line.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty, 0),
    [lines],
  );

  const value = useMemo(
    () => ({ lines, count, open, setOpen, add, setQty, remove, clear }),
    [lines, count, open, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
