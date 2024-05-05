import {useCallback, useState} from 'react';

export function useBoolean(defaultValue: boolean) {
  const [isTrue, setIsTrue] = useState<boolean>(defaultValue);
  const onTrue = useCallback(() => {
    setIsTrue(true);
  }, []);
  const onFalse = useCallback(() => {
    setIsTrue(false);
  }, []);
  const onToggle = useCallback(() => {
    setIsTrue(prev => !prev);
  }, []);
  return {
    isTrue,
    onTrue,
    onFalse,
    onToggle,
  };
}
