'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Footer from './components/Footer';
import Background from './components/Background';
import ColorButtons from './components/ColorButtons';
import Scene3D from './components/Scene3D';

export default function Home() {
  const [section, setCurrentSection] = useState('Releases');
  const [color, setColor] = useState('#ffffff');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [modelVisible, setModelVisible] = useState(false);

  // Detect device type
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);
    };
    
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  // Trigger model animation on initial load com transição mais suave
  useEffect(() => {
    // Pequeno delay inicial antes de começar a mostrar o modelo
    const timer = setTimeout(() => {
      setModelVisible(true);
    }, 1000); // Delay aumentado para permitir que a página carregue primeiro
    return () => clearTimeout(timer);
  }, []);

  // Handle section change to trigger model animation com transições mais suaves
  const handleSectionChange = (newSection) => {
    if (newSection === section) return;
    
    // Hide model first - fade out suave
    setModelVisible(false);
    
    // Delay maior para mudança de seção para permitir animação completa
    setTimeout(() => {
      setCurrentSection(newSection);
      // Show model again after section change com delay maior
      setTimeout(() => {
        setModelVisible(true);
      }, 800); // Aumentar para dar tempo ao conteúdo da seção aparecer
    }, 500); // Dar tempo suficiente para o modelo desaparecer
  };

  // Handle color change animation com tempos mais suaves
  const handleColorChange = (newColor) => {
    if (newColor === color) return; // Prevenir mudanças desnecessárias
    
    // Fade out suave
    setModelVisible(false);
    
    // Esperar pela animação de saída
    setTimeout(() => {
      setColor(newColor);
      
      // Mostrar novamente após a mudança de cor
      setTimeout(() => {
        setModelVisible(true);
      }, 400); // Tempo maior para transição mais suave
    }, 350); // Esperar fade-out completo
  };

  return (
    <div className='max-h-screen w-full overflow-x-hidden'>
      <Background />
      <ColorButtons 
        setColor={handleColorChange} 
        isMobile={isMobile} 
        isTablet={isTablet} 
      />
      <Header 
        section={section} 
        setCurrentSection={handleSectionChange} 
        isMobile={isMobile} 
        isTablet={isTablet} 
      />

      <div className={`flex ${isMobile || isTablet ? 'flex-col' : 'flex-row'} justify-center items-center px-4 md:px-8 ${isMobile || isTablet ? 'lg:px-25' : 'lg:px-16'} ${isMobile || isTablet ? 'lg:pl-55' : 'lg:pl-36'} text-slate-700 ${isMobile ? 'mt-16' : isTablet ? 'mt-8' : 'mt-0'} ${!isMobile && !isTablet ? 'gap-0' : ''}`}>
        <div className={`text-center ${!isMobile && !isTablet ? 'text-left' : ''} w-full z-10 px-4 md:px-8 ${isTablet ? 'max-w-2xl mx-auto' : !isMobile ? 'pr-0 mr-0 max-w-xl' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }} // Bezier curve para movimento mais orgânico
              className="space-y-4"
            >
              <span className="text-sm uppercase tracking-wider font-bold text-slate-600">Just In</span>
              
              <h1 className={`text-4xl ${isTablet ? 'text-5xl' : 'md:text-5xl lg:text-7xl'} font-[var(--font-outfit)] font-bold`}>
                Nike Dunk Low
              </h1>

              <h2 className="text-xl md:text-2xl font-light tracking-wide">
                Legendary Style, Reborn
              </h2>

              <p className={`font-[var(--font-inter)] text-sm ${isTablet ? 'text-base' : 'md:text-base'} mt-4 sm:w-full p-4 sm:p-0 max-w-lg mx-auto md:mx-0`}>
                Born in the hardwood but taken to the streets, the Nike Dunk Low returns with crisp overlays and original team colors. This basketball icon channels '80s vibes with premium leather in the upper that breaks in beautifully and ages to perfection.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className='bg-slate-700 text-white px-8 py-3 transition-all 
                                 duration-300 ease-in-out transform hover:scale-105 
                                 hover:border-2 border-white/30 rounded-full text-sm font-bold tracking-wide'>
                  Shop Now
                </button>
                <button className='bg-transparent text-slate-700 px-8 py-3 transition-all 
                                 duration-300 ease-in-out transform hover:scale-105 
                                 border-2 border-slate-700 rounded-full text-sm font-bold tracking-wide'>
                  Learn More
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div 
          className={`w-full ${isMobile ? 'h-[350px]' : isTablet ? 'h-[450px]' : 'h-[550px]'} ${isTablet ? 'mt-8' : isMobile ? 'mt-4' : 'mt-0'} ${!isMobile && !isTablet ? 'ml-[-80px]' : ''} flex items-center justify-center`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Transição mais longa e suave para o container
        >
          <Scene3D 
            color={color} 
            isMobile={isMobile} 
            isTablet={isTablet} 
            visible={modelVisible}
          />
        </motion.div>
      </div>

      <Footer isMobile={isMobile} isTablet={isTablet} />
    </div>
  );
}
