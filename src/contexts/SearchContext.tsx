import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  code: string;
  price: number;
  imageUrl?: string;
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  isSearching: boolean;
  performSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
  hasSearched: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:3333/api';

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      clearSearch();
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/products/search`, {
        params: { q: query }
      });


      const productsData = response.data?.data || [];

      setSearchResults(Array.isArray(productsData) ? productsData : []);

    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      searchResults,
      isSearching,
      performSearch,
      clearSearch,
      hasSearched,
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
