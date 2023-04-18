import { useEffect } from 'react';

type ArrowKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

interface UseArrowKeysOptions {
  onKeyPress: (key: ArrowKey) => void;
}

const useArrowKeys = ({ onKeyPress }: UseArrowKeysOptions) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      onKeyPress(event.key as ArrowKey);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPress]);
};

export default useArrowKeys;