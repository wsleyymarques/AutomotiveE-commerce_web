import React, { useState } from 'react';
import { Search, ShoppingCart, User, LogOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useSearch } from '@/contexts/SearchContext';
import { LoginModal } from './LoginModal';
import { CartSidebar } from './CartSidebar';

export const Header: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems, setIsOpen } = useCart();
  const { searchQuery, setSearchQuery, performSearch, clearSearch, hasSearched } = useSearch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await performSearch(searchQuery);
  };

  const handleClearSearch = () => {
    clearSearch();
  };

  return (
      <>
        <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center">
                <h1 className="text-2xl text-accent font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AutoPeças Shoppe
                </h1>
              </div>

              <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                      type="text"
                      placeholder="Buscar peças automotivas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-10 py-2 w-full border-border focus:border-primary transition-colors"
                  />
                  {hasSearched && (
                      <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleClearSearch}
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                  )}
                </div>
              </form>

              <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsOpen(true)}
                    className="relative"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                  )}
                  <span className="hidden sm:inline ml-2">Carrinho</span>
                </Button>

                {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4" />
                          <span className="hidden sm:inline ml-2">Perfil</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Olá, {user.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sair</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button
                        variant="automotive"
                        size="sm"
                        onClick={() => setShowLoginModal(true)}
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline ml-2">Entrar</span>
                    </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
        />

        <CartSidebar />
      </>
  );
};
