import React, {useEffect} from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface Product {
  id: number;
  name: string;
  code: string;
  price: number;
  imageUrl?: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    console.log('Dados do produto recebidos:', product);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem(product.id, 1);
  };

  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 border-border bg-gradient-card">
      <CardContent className="p-4">
        <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
          
          <Badge variant="secondary" className="text-xs">
            {product.code}
          </Badge>
          
          <div className="pt-2">
            <p className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full"
          variant={user ? "automotive" : "outline"}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {user ? "Comprar" : "Comprar"}
        </Button>
      </CardFooter>
    </Card>
  );
};
