import { useState, useCallback } from 'react';
import { generateAppraisalValue } from '../utils/appraisalGenerator';

type AppState = 'idle' | 'animating' | 'completed';

export const useAppraisal = () => {
  const [state, setState] = useState<AppState>('idle');
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const startAppraisal = useCallback(() => {
    setState('animating');
    setShowResult(false);
    const finalValue = generateAppraisalValue();

    // 値をすぐに設定（スロットアニメーションで使用）
    setCurrentValue(finalValue);

    // 桁数を取得してアニメーション時間を計算
    const digits = finalValue.toString().length;
    const stopInterval = 250; // 各桁の停止間隔（ミリ秒）
    const totalAnimationTime = digits * stopInterval;
    const resultDelay = 500; // すべての桁が停止してから結果表示までの遅延

    // アニメーション完了後に状態を更新
    setTimeout(() => {
      setState('completed');
    }, totalAnimationTime);

    // 結果テキストのフェードイン
    setTimeout(() => {
      setShowResult(true);
    }, totalAnimationTime + resultDelay);
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setCurrentValue(null);
    setShowResult(false);
  }, []);

  return {
    state,
    currentValue,
    showResult,
    isAnimating: state === 'animating',
    isCompleted: state === 'completed',
    isIdle: state === 'idle',
    startAppraisal,
    reset,
  };
};
