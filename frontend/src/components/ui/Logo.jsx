import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation variants
const logoContainerVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const logoIconVariants = {
  initial: { rotate: -180, scale: 0 },
  animate: { 
    rotate: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  hover: {
    scale: 1.05,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const textVariants = {
  initial: { x: -20, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const glowVariants = {
  animate: {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.1, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Logo = ({ size = 'md', showText = true, animated = true }) => {
  const sizes = {
    sm: {
      container: 'w-8 h-8',
      text: 'text-lg',
      icon: 'text-base',
      gap: 'gap-2'
    },
    md: {
      container: 'w-10 h-10',
      text: 'text-xl',
      icon: 'text-lg',
      gap: 'gap-3'
    },
    lg: {
      container: 'w-12 h-12',
      text: 'text-2xl',
      icon: 'text-xl',
      gap: 'gap-3'
    },
    xl: {
      container: 'w-16 h-16',
      text: 'text-3xl',
      icon: 'text-2xl',
      gap: 'gap-4'
    }
  };

  const sizeConfig = sizes[size];

  const LogoContent = () => (
    <>
      {/* Logo Icon Container */}
      <motion.div
        className="relative group"
        variants={animated ? logoIconVariants : {}}
        initial={animated ? "initial" : false}
        animate={animated ? "animate" : false}
        whileHover={animated ? "hover" : {}}
      >
        {/* Animated glow background */}
        <motion.div
          className={`absolute inset-0 ${sizeConfig.container} rounded-xl blur-md opacity-50`}
          style={{
            background: 'linear-gradient(135deg, var(--grad-1), var(--grad-2))'
          }}
          variants={glowVariants}
          animate="animate"
        />

        {/* Main logo container */}
        <div 
          className={`
            ${sizeConfig.container} rounded-xl
            relative overflow-hidden
            flex items-center justify-center
            text-white font-bold ${sizeConfig.icon}
            transition-all duration-300
            group-hover:shadow-2xl
          `}
          style={{
            background: 'linear-gradient(135deg, var(--grad-1), var(--grad-2))',
            boxShadow: '0 8px 24px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Inner gradient shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
            animate={{
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Hover shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />

          {/* Logo letter/icon - Ready for SVG replacement */}
          <span className="relative z-10 select-none">
            {/* Replace this with your SVG logo */}
            Y
          </span>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-br from-white/40 to-transparent rounded-bl-lg" />
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-gradient-to-tr from-black/20 to-transparent rounded-tr-lg" />
        </div>

        {/* Floating particles effect */}
        {animated && (
          <>
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"
              animate={{
                y: [-2, -6, -2],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"
              animate={{
                y: [2, 6, 2],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </>
        )}
      </motion.div>

      {/* Logo Text */}
      {showText && (
        <motion.div
          className="relative"
          variants={animated ? textVariants : {}}
          initial={animated ? "initial" : false}
          animate={animated ? "animate" : false}
        >
          <span 
            className={`
              ${sizeConfig.text} font-bold
              bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)]
              bg-clip-text text-transparent
              transition-all duration-300
              group-hover:from-purple-400 group-hover:to-pink-400
            `}
            style={{
              textShadow: '0 2px 10px rgba(124, 58, 237, 0.2)'
            }}
          >
            Yaksh
          </span>
          
          {/* Subtle underline decoration */}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </>
  );

  return (
    <Link to="/" className="flex items-center group">
      <motion.div 
        className={`flex items-center ${sizeConfig.gap}`}
        variants={animated ? logoContainerVariants : {}}
        initial={animated ? "initial" : false}
        animate={animated ? "animate" : false}
      >
        <LogoContent />
      </motion.div>
    </Link>
  );
};

export default Logo;