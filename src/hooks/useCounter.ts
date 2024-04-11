import { useState } from 'react';

interface Counter {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounter = (initialCount = 0): Counter => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return { count, increment, decrement };
};
