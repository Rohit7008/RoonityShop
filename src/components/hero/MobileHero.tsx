import { motion } from 'framer-motion';

interface MobileHeroProps {
  isMobile: boolean;
}

const MobileHero = ({ isMobile }: MobileHeroProps) => {
  // Only render if mobile view is detected
  if (!isMobile) return null;

  return (
    <div className="mobile-hero-container relative h-screen overflow-hidden">
      {/* ROONITY text - centered with proper styling */}
      <motion.div 
        className="mobile-hero-text absolute inset-0 flex items-center justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="roonity-text font-orbitron text-center text-[16vw] font-black text-gray-300 tracking-tighter">
          ROONITY
        </h1>
      </motion.div>
    </div>
  );
};

export default MobileHero; 