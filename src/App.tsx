import AppraisalPanel from './components/AppraisalPanel';
import AppraisalButton from './components/AppraisalButton';
import ResultText from './components/ResultText';
import { useAppraisal } from './hooks/useAppraisal';

function App() {
  const {
    currentValue,
    isAnimating,
    isCompleted,
    isIdle,
    showResult,
    startAppraisal,
    reset,
  } = useAppraisal();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl px-4 sm:px-6 md:px-8 space-y-8">
        {/* 鑑定額表示パネル */}
        <AppraisalPanel value={currentValue} isAnimating={isAnimating} />

        {/* 鑑定士イラスト */}
        <div className="flex justify-center">
          <img
            src="/images/appraisal-panel.png"
            alt="鑑定団パネル"
            className="w-full h-auto object-contain max-h-48 sm:max-h-64 md:max-h-96 rounded-lg shadow-lg"
          />
        </div>

        {/* 結果テキスト */}
        {currentValue !== null && showResult && (
          <div className="flex justify-center">
            <ResultText value={currentValue} show={showResult} />
          </div>
        )}

        {/* ボタン */}
        <div className="flex justify-center">
          {(isIdle || isAnimating) && (
            <AppraisalButton
              onClick={startAppraisal}
              disabled={isAnimating}
              label={isIdle ? '鑑定開始' : '鑑定中...'}
            />
          )}
          {isCompleted && (
            <AppraisalButton
              onClick={reset}
              disabled={false}
              label="もう一度鑑定"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
