import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router';
import { useDirection } from './DirectionContext';

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

export const PageTransitionWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
        className="absolute w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionWrapper;
