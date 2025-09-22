import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductGrid } from '@/components/ProductGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nossos Produtos
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Encontre a peça perfeita para o seu veículo em nosso catálogo completo
              </p>
            </div>
            
            <ProductGrid />
          </div>
        </section>
      </main>
      
      <footer className="bg-automotive-charcoal text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">AutoPeças Pro</h3>
          <p className="text-white/80 mb-4">
            Sua loja de confiança para auto peças de qualidade
          </p>
          <p className="text-white/60 text-sm">
            © 2024 AutoPeças Pro. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
