import SlotAnimation from './SlotAnimation';

interface AppraisalPanelProps {
  value: number | null;
  isAnimating: boolean;
}

const AppraisalPanel = ({ value, isAnimating }: AppraisalPanelProps) => {
  // 値を桁ごとに分解してカンマ区切りの配列にする
  const getDigitsWithCommas = (num: number): Array<{ type: 'digit' | 'comma'; value: string | number }> => {
    const str = num.toString();
    const digits = str.split('').map(d => parseInt(d, 10));
    const result: Array<{ type: 'digit' | 'comma'; value: string | number }> = [];

    // 右から3桁ごとにカンマを挿入
    const reversedDigits = [...digits].reverse();
    reversedDigits.forEach((digit, index) => {
      result.unshift({ type: 'digit', value: digit });
      if ((index + 1) % 3 === 0 && index !== reversedDigits.length - 1) {
        result.unshift({ type: 'comma', value: ',' });
      }
    });

    return result;
  };

  // 各桁の停止遅延時間を計算（右端から順に停止）
  const getStopDelay = (digitIndex: number, totalDigits: number): number => {
    const stopInterval = 250; // 各桁の停止間隔（ミリ秒）
    // 右端から数えたインデックス（右端が0）
    const reverseIndex = totalDigits - 1 - digitIndex;
    return reverseIndex * stopInterval;
  };

  return (
    <div className="bg-appraisal-red w-full max-w-4xl p-8 rounded-lg shadow-2xl">
      <div className="flex items-center justify-center gap-2">
        <span className="text-black font-noto-sans font-black text-6xl md:text-8xl">
          ¥
        </span>
        <div className="flex items-center">
          {value !== null && isAnimating ? (
            // アニメーション中：各桁をSlotAnimationで表示
            <>
              {getDigitsWithCommas(value).map((item, index) => {
                if (item.type === 'comma') {
                  return (
                    <span
                      key={`comma-${index}`}
                      className="text-black font-noto-sans font-black text-6xl md:text-8xl mx-1"
                    >
                      ,
                    </span>
                  );
                }

                // 数字の桁のみをカウント（カンマを除く）
                const digitOnlyIndex = getDigitsWithCommas(value)
                  .slice(0, index)
                  .filter(i => i.type === 'digit').length;
                const totalDigits = value.toString().length;

                return (
                  <SlotAnimation
                    key={`digit-${index}`}
                    finalDigit={item.value as number}
                    isSpinning={isAnimating}
                    delay={getStopDelay(digitOnlyIndex, totalDigits)}
                  />
                );
              })}
            </>
          ) : value !== null && !isAnimating ? (
            // アニメーション完了後：通常表示
            <span className="text-black font-noto-sans font-black text-6xl md:text-8xl tracking-wider">
              {value.toLocaleString('ja-JP')}
            </span>
          ) : (
            // 初期状態：?マーク表示
            <span className="text-black font-noto-sans font-black text-6xl md:text-8xl tracking-wider">
              ??????
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppraisalPanel;
