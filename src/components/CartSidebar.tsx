import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export const CartSidebar: React.FC = () => {
  const { items, isOpen, setIsOpen, updateItem, removeItem, totalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* MUDANÇA 1: Adicionamos classes flexbox aqui para controlar o layout geral */}
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Seu Carrinho ({items.length} {items.length === 1 ? 'item' : 'itens'})
            </SheetTitle>
            <SheetDescription>
              {items.length === 0
                  ? 'Seu carrinho está vazio'
                  : 'Revise seus itens antes de finalizar a compra'
              }
            </SheetDescription>
          </SheetHeader>

          {/* O container extra foi removido, agora o conteúdo é controlado pelo SheetContent */}
          {items.length === 0 ? (
              // MUDANÇA 2: Adicionamos flex-1 para centralizar o conteúdo verticalmente no espaço restante
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Seu carrinho está vazio</p>
                  <p className="text-sm">Adicione algumas peças incríveis!</p>
                </div>
              </div>
          ) : (
              <>
                {/* MUDANÇA 3: A lista de itens agora ocupa todo o espaço disponível e tem sua própria rolagem */}
                <div className="flex-1 overflow-y-auto py-6 space-y-4">
                  {items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                          {item.product.imageUrl ? (
                              <img
                                  src={item.product.imageUrl}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover rounded-md"
                              />
                          ) : (
                              <div className="text-xs text-muted-foreground text-center">
                                Sem imagem
                              </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{item.product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Código: {item.product.code}
                          </p>
                          <p className="font-semibold text-primary">
                            {formatPrice(item.product.price)}
                          </p>

                          <div className="flex items-center gap-2 mt-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateItem(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateItem(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeItem(item.id)}
                                className="ml-auto text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>

                {/* Este rodapé agora fica fixo na parte de baixo */}
                <div className="border-t border-border pt-4 space-y-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-primary">{formatPrice(totalPrice)}</span>
                  </div>

                  <Button className="w-full" variant="automotive">
                    Finalizar Compra
                  </Button>
                </div>
              </>
          )}
        </SheetContent>
      </Sheet>
  );
};
