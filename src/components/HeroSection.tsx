import React from 'react';
import { Button } from '@/components/ui/button';
import { Wrench, Truck, Shield, Star } from 'lucide-react';
import heroImage from '@/assets/hero-automotive.jpg';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Background */}
      <div className="relative bg-gradient-hero py-20 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero/80" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Encontre as Melhores
            <span className="block text-accent">Auto Peças</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Qualidade garantida, preços competitivos e entrega rápida para manter seu veículo sempre funcionando perfeitamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="orange" className="text-lg px-8">
              <Wrench className="mr-2 h-5 w-5" />
              Ver Catálogo
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-muted-foreground">
                Receba suas peças em até 24 horas nas principais capitais
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualidade Garantida</h3>
              <p className="text-muted-foreground">
                Todas as peças com garantia e certificação de qualidade
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Melhor Preço</h3>
              <p className="text-muted-foreground">
                Preços competitivos e condições especiais para revendedores
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
