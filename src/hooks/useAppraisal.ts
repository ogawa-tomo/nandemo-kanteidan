import { useState, useCallback } from 'react';
import { generateAppraisalValue } from '../utils/appraisalGenerator';

type AppState = 'idle' | 'animating' | 'completed';

export const useAppraisal = () => {
  const [state, setState] = useState<AppState>('idle');
  const [currentValue, setCurrentValue] = useState<number | null>(null);

  const startAppraisal = useCallback(() => {
    setState('animating');
    const finalValue = generateAppraisalValue();

    // アニメーション時間（2〜3秒）
    setTimeout(() => {
      setCurrentValue(finalValue);
      setState('completed');
    }, 2500);
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setCurrentValue(null);
  }, []);

  return {
    state,
    currentValue,
    isAnimating: state === 'animating',
    isCompleted: state === 'completed',
    isIdle: state === 'idle',
    startAppraisal,
    reset,
  };
};
