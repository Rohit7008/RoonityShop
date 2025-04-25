import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../layout/Navbar';
import Collections from '../collections/Collections';
import Footer from '../layout/Footer';
import MobileHero from './MobileHero';
import { useIsMobile } from '@/hooks/useIsMobile';

const Hero = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Transform values for cube position and movement - Desktop behavior
  const desktopCubeY = useTransform(scrollYProgress, 
    [0, 0.15, 0.25, 0.35],
    ['0', '0', '5vh', '5vh']
  );
  const desktopCubeX = useTransform(scrollYProgress, 
    [0, 0.15, 0.25, 0.35],
    ['0', '0', '25vw', '25vw']
  );
  
  // Mobile behavior - straight line movement
  const mobileCubeY = useTransform(scrollYProgress,
    [0, 0.15, 0.25, 0.35, 0.45],
    ['0vh', '5vh', '10vh', '15vh', '20vh']
  );
  
  // Use mobile or desktop values based on isMobile
  const cubeY = isMobile ? mobileCubeY : desktopCubeY;
  const cubeX = isMobile ? 0 : desktopCubeX;
  
  const cubeScale = useTransform(scrollYProgress, 
    [0, 0.25, 0.35],
    [isMobile ? 0.55 : 0.7, isMobile ? 0.5 : 0.65, isMobile ? 0.45 : 0.65]
  );
  
  // Opacity transitions for cube - fade out after stopping
  // For mobile, fade out when reaching about section
  const cubeFacesOpacity = useTransform(scrollYProgress,
    isMobile 
      ? [0, 0.25, 0.3, 0.35] 
      : [0.25, 0.30],
    isMobile 
      ? [1, 1, 0.5, 0] 
      : [1, 0]
  );
  
  // Logo visibility and position in About section
  const logoOpacity = useTransform(scrollYProgress,
    [0.5, 0.55, 0.6],
    [0, 1, 1]
  );
  const logoScale = useTransform(scrollYProgress,
    [0.5, 0.55, 0.6],
    [0.7, 0.8, 0.8]
  );
  
  // Text opacity transforms for first section
  const backgroundTextOpacity = useTransform(scrollYProgress,
    [0, 0.25],
    [0.3, 0]
  );
  
  // Section 2 fade in and out - properly spaced in page
  const contentOpacity = useTransform(scrollYProgress,
    [0.25, 0.3, 0.35, 0.4, 0.45],
    [0, 0.5, 1, 1, 0]
  );
  
  // Section 2 movement - smooth transition through viewport
  const contentY = useTransform(scrollYProgress,
    [0.25, 0.3, 0.35, 0.4, 0.45],
    ['35vh', '20vh', '0vh', '-20vh', '-35vh']
  );

  // About section timing - start after cube fades out
  const aboutOpacity = useTransform(scrollYProgress,
    [0.30, 0.35],
    [0, 1]
  );

  // About section image fade in - after cube is gone
  const imageOpacity = useTransform(scrollYProgress,
    [0.30, 0.32, 0.35],
    [0, 0.5, 1]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative bg-black overflow-hidden">
      <Navbar />
      
      {/* Main Container - Contains all sections */}
      <div className="relative min-h-[400vh]">
        {/* First Section - Hero with ROO NITY */}
        <section className="h-screen relative">
          {/* Mobile-specific hero (only renders on mobile) */}
          {isMobile && <MobileHero isMobile={isMobile} />}

          {/* Desktop Background Text Layout - Fades out during scroll (only shown on desktop) */}
          {!isMobile && (
            <motion.div 
              className="absolute inset-0 pointer-events-none flex justify-between items-center px-4"
              style={{ opacity: backgroundTextOpacity }}
            >
              {/* Left Text - ROO */}
              <span className="font-orbitron text-[15vw] font-black text-gray-300 tracking-tighter">
                ROO
              </span>
              
              {/* Right Text - NITY */}
              <span className="font-orbitron text-[15vw] font-black text-gray-300 tracking-tighter">
                NITY
              </span>
            </motion.div>
          )}

          {/* Bottom Right Text (shown on desktop only) */}
          {!isMobile && (
            <div className="absolute bottom-8 right-8 text-gray-500 text-sm italic">
              <p className="text-right">
                *ESTABLISHED — 2025<br />
                MUMBAI, INDIA*
              </p>
            </div>
          )}
        </section>

        {/* Second Section - Elevate Your Streetwear Game */}
        <section className="h-screen relative">
          <div 
            className="h-full flex items-center container mx-auto px-4"
            style={{ transform: `translateY(${contentY})` }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
              {/* Left Content */}
              <div className="lg:w-1/2 space-y-8 relative">
                <h2 
                  className="text-5xl md:text-6xl font-bold text-white leading-tight relative z-10"
                >
                  Elevate Your<br />Streetwear Game
                </h2>
                
                <p 
                  className="text-xl text-gray-300 leading-relaxed max-w-xl relative z-10"
                >
                  Discover limited drops, bold statements, and iconic designs made for the culture.
                </p>

                <div 
                  className="flex flex-wrap gap-4 pt-8 relative z-10"
                >
                  <a 
                    href="/shop" 
                    className="px-8 py-4 bg-white text-black rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
                  >
                    Shop Now
                  </a>
                  <a 
                    href="/lookbook" 
                    className="px-8 py-4 border-2 border-white text-white rounded-full font-medium transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
                  >
                    View Lookbook
                  </a>
                </div>
              </div>

              {/* Right Side - Reference point for cube */}
              <div id="cube-target" className="lg:w-1/2 h-[50vh] flex justify-end"></div>
            </div>
          </div>
        </section>

        {/* Third Section - About */}
        <section id="about" className="h-screen relative">
          <motion.div 
            className="h-full flex items-center py-4 px-4"
            style={{ opacity: aboutOpacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="container mx-auto">
              <div className="max-w-6xl mx-auto flex flex-col items-center">
                {/* Top Section with Logo and Heading */}
                <div className="flex flex-col items-center mb-3 relative z-20">
                  {/* Logo Image - Further reduced size */}
                  <div className="w-28 h-28 md:w-40 md:h-40 mb-3">
                    <img 
                      src="/mockups/mockup-1.png" 
                      alt="ROONITY Logo" 
                      className="w-full h-full object-cover rounded-lg shadow-[0_0_30px_rgba(57,255,20,0.3)]"
                    />
                  </div>

                  {/* Heading */}
                  <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-3">
                    ROONITY: Designed to Disrupt
                  </h2>
                </div>
                
                {/* Content Grid - Tightened spacing */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-3 mb-4">
                  {/* Left Column */}
                  <div className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                    <p className="mb-2">
                      Born in Mumbai, 2025 — ROONITY exists at the edge of streetwear and self-expression. We don't follow trends. We build statements.
                    </p>
                    
                    <p className="mb-2">
                      From limited drops to ethically-sourced cuts, we craft pieces that move with the city and speak for the culture.
                    </p>
                    
                    <p>
                      No noise. No filler. Just raw, intentional fashion built for those who don't ask for permission.
                    </p>
                  </div>
                  
                  {/* Right Column */}
                  <div className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                    <p className="mb-2">
                      We collaborate with creators, challenge fast fashion, and stay rooted in community.
                    </p>
                    
                    <p className="mb-2">
                      This isn't just style — it's streetwear with a spine.
                    </p>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">👉 Join the Movement</h3>
                      <p className="text-lg lg:text-2xl text-gray-300 italic">
                        Drop in. Stand out. Wear ROONITY.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* CTA Button - Improved mobile visibility */}
                <div className="flex justify-center mt-6 mb-16 sm:mb-8 md:mb-2 relative z-30">
                  <a 
                    href="/about" 
                    className="inline-flex items-center px-6 py-3 md:py-2 border-2 border-neon-purple rounded-full font-medium text-neon-purple hover:bg-neon-purple/10 transition-all duration-300 shadow-lg shadow-neon-purple/20"
                  >
                    <span>Our Full Story</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Fourth Section - Collections */}
        <Collections />
        
        {/* Footer */}
        <Footer />
            
        {/* Cube Container - with different behavior for mobile */}
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none">
          {mounted && (
            <motion.div 
              className={`z-20 pointer-events-auto ${isMobile ? 'mobile-cube-animation' : ''}`}
              style={{
                x: cubeX,
                y: cubeY,
                scale: cubeScale,
                opacity: cubeFacesOpacity
              }}
            >
              <div className="perspective-1000 w-80 h-80 transition-all duration-500 ease-in-out">
                <div className="cube w-full h-full relative transform-style-preserve-3d animate-cube-rotate">
                  <div className="cube-face front hover:shadow-[0_0_40px_rgba(57,255,20,0.8)] hover:border-[rgba(57,255,20,1)] transition-all duration-300">
                    <div className="absolute inset-0 z-10 hover:opacity-0 transition-opacity duration-300"></div>
                    <img src="/mockups/mockup-1.png" alt="Front" className="w-full h-full object-cover rounded-lg relative z-0" />
                  </div>
                  <div className="cube-face back hover:shadow-[0_0_40px_rgba(57,255,20,0.8)] hover:border-[rgba(57,255,20,1)] transition-all duration-300">
                    <div className="absolute inset-0 z-10 hover:opacity-0 transition-opacity duration-300"></div>
                    <img src="/mockups/mockup-2.png" alt="Back" className="w-full h-full object-cover rounded-lg relative z-0" />
                  </div>
                  <div className="cube-face right hover:shadow-[0_0_40px_rgba(57,255,20,0.8)] hover:border-[rgba(57,255,20,1)] transition-all duration-300">
                    <div className="absolute inset-0 z-10 hover:opacity-0 transition-opacity duration-300"></div>
                    <img src="/mockups/mockup-3.png" alt="Right" className="w-full h-full object-cover rounded-lg relative z-0" />
                  </div>
                  <div className="cube-face left hover:shadow-[0_0_40px_rgba(57,255,20,0.8)] hover:border-[rgba(57,255,20,1)] transition-all duration-300">
                    <div className="absolute inset-0 z-10 hover:opacity-0 transition-opacity duration-300"></div>
                    <img src="/mockups/mockup-4.png" alt="Left" className="w-full h-full object-cover rounded-lg relative z-0" />
                  </div>
                  <div className="cube-face top hover:shadow-[0_0_40px_rgba(57,255,20,0.8)] hover:border-[rgba(57,255,20,1)] transition-all duration-300">
                    <div className="absolute inset-0 z-10 hover:opacity-0 transition-opacity duration-300"></div>
                    <img src="/mockups/mockup-5.png" alt="Top" className="w-full h-full object-cover rounded-lg relative z-0" />
                  </div>
                  <div className="cube-face bottom hover:shadow-[0_0_40px_rgba(57,255,20,0.8)] hover:border-[rgba(57,255,20,1)] transition-all duration-300">
                    <div className="absolute inset-0 z-10 hover:opacity-0 transition-opacity duration-300"></div>
                    <img src="/mockups/mockup-6.png" alt="Bottom" className="w-full h-full object-cover rounded-lg relative z-0" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero; 