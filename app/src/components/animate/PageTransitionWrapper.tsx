import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { useLocation } from 'react-router';
import { useDirection } from './DirectionContext';

import './PageTransitionWrapper.scss';

const variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export const PageTransitionWrapper = ({
  children,
}: PageTransitionWrapperProps) => {
  const location = useLocation();
  const { direction } = useDirection();

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={direction}
        className="motion-div"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
