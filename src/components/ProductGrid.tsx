import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Loader2, AlertCircle, SearchX } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/contexts/SearchContext';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  code: string;
  price: number;
  imageUrl?: string;
}

const API_BASE_URL = 'http://localhost:3333/api';

export const ProductGrid: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { searchResults, isSearching, hasSearched, clearSearch } = useSearch();

  const productsToShow = hasSearched ? searchResults : allProducts;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products?limit=20`);
        const productsData = response.data.data.products;

        if (Array.isArray(productsData)) {
          setAllProducts(productsData);
        } else {
          console.warn('A resposta da API de produtos não retornou um array no caminho esperado.');
          setAllProducts([]);
        }
      } catch (err: any) {
        console.error('Erro ao carregar produtos:', err);
        setError('Erro ao carregar produtos. Verifique se o backend está funcionando.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading || isSearching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">
            {isSearching ? 'Buscando produtos...' : 'Carregando produtos...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (productsToShow.length === 0) {
    return (
      <div className="text-center py-20">
        {hasSearched ? (
          <div>
            <SearchX className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-lg font-medium mb-2">Nenhum produto encontrado</p>
            <p className="text-muted-foreground mb-4">
              Tente buscar com outras palavras-chave
            </p>
            <Button variant="outline" onClick={clearSearch}>
              Ver todos os produtos
            </Button>
          </div>
        ) : (
          <p className="text-muted-foreground">Nenhum produto encontrado.</p>
        )}
      </div>
    );
  }

  return (
    <div>
      {hasSearched && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Encontrados {productsToShow.length} resultado(s)
            </p>
            <Button variant="ghost" size="sm" onClick={clearSearch}>
              Limpar busca
            </Button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productsToShow.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
