import { useEffect, useState } from 'react';

interface SlotAnimationProps {
  finalDigit: number;
  isSpinning: boolean;
  delay?: number; // 停止するまでの遅延時間（ミリ秒）
}

const SlotAnimation = ({ finalDigit, isSpinning, delay = 0 }: SlotAnimationProps) => {
  const [currentDigit, setCurrentDigit] = useState(0);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    if (isSpinning && !isStopped) {
      // スロットが回転中：高速で数字を循環
      const interval = setInterval(() => {
        setCurrentDigit((prev) => (prev + 1) % 10);
      }, 100); // 0.1秒ごとに数字を変更

      // 指定された遅延時間後に停止
      const stopTimer = setTimeout(() => {
        clearInterval(interval);
        setCurrentDigit(finalDigit);
        setIsStopped(true);
      }, delay);

      return () => {
        clearInterval(interval);
        clearTimeout(stopTimer);
      };
    }
  }, [isSpinning, isStopped, finalDigit, delay]);

  // リセット時の処理
  useEffect(() => {
    if (!isSpinning) {
      setCurrentDigit(0);
      setIsStopped(false);
    }
  }, [isSpinning]);

  return (
    <div className="overflow-hidden h-20 md:h-32 inline-block">
      <div
        className={`
          text-black font-noto-sans font-black text-6xl md:text-8xl
          transition-all duration-300
          ${isStopped ? 'scale-105' : ''}
        `}
        style={{
          lineHeight: '1.2',
        }}
      >
        {currentDigit}
      </div>
    </div>
  );
};

export default SlotAnimation;
