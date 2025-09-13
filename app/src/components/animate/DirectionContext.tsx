import { createContext, useContext, useState } from 'react';

type Direction = 1 | -1;

type DirectionContextType = {
  direction: Direction;
  setDirection: (dir: Direction) => void;
};

const DirectionContext = createContext<DirectionContextType>({
  direction: 1,
  setDirection: () => {},
});

export const DirectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [direction, setDirection] = useState<Direction>(1);
  return (
    <DirectionContext.Provider value={{ direction, setDirection }}>
      {children}
    </DirectionContext.Provider>
  );
};

export const useDirection = () => useContext(DirectionContext);
