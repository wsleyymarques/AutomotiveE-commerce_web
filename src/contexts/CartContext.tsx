import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  code: string;
  price: number;
  imageUrl?: string;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface CartContextType {
  items: CartItem[];
  addItem: (productId: number, quantity?: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  totalItems: number;
  totalPrice: number;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:3333/api';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadCart = async () => {
    if (!user) return;
    
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`);
      setItems(response.data);
    } catch (error: any) {
      console.error('Erro ao carregar carrinho:', error);
    }
  };

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setItems([]);
    }
  }, [user]);

  const addItem = async (productId: number, quantity: number = 1) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para adicionar itens ao carrinho",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/cart`, {
        productId,
        quantity,
      });
      await loadCart();
      toast({
        title: "Item adicionado",
        description: "Produto adicionado ao carrinho com sucesso!",
      });
    } catch (error: any) {
      const message = error.response?.data?.error || 'Erro ao adicionar item';
      toast({
        title: "Erro",
        description: message,
        variant: "destructive",
      });
    }
  };

  const updateItem = async (itemId: number, quantity: number) => {
    try {
      await axios.put(`${API_BASE_URL}/cart/${itemId}`, { quantity });
      await loadCart();
    } catch (error: any) {
      const message = error.response?.data?.error || 'Erro ao atualizar item';
      toast({
        title: "Erro",
        description: message,
        variant: "destructive",
      });
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/${itemId}`);
      await loadCart();
      toast({
        title: "Item removido",
        description: "Produto removido do carrinho",
      });
    } catch (error: any) {
      const message = error.response?.data?.error || 'Erro ao remover item';
      toast({
        title: "Erro",
        description: message,
        variant: "destructive",
      });
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      isOpen,
      setIsOpen,
      totalItems,
      totalPrice,
      loadCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};