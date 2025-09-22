import React from 'react';
import heroImage from '@/assets/hero-automotive.jpg';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="relative bg-gradient-hero py-20 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero/80" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-accent mb-6">
            Encontre as Melhores
            <span className="block text-accent">Auto Peças</span>
          </h1>
          <p className="text-xl  mb-8 max-w-2xl mx-auto">
            Qualidade garantida, preços competitivos e entrega rápida para manter seu veículo sempre funcionando perfeitamente.
          </p>

        </div>
      </div>


    </div>
  );
};
