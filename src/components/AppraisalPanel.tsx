import { formatCurrency } from '../utils/appraisalGenerator';

interface AppraisalPanelProps {
  value: number | null;
}

const AppraisalPanel = ({ value }: AppraisalPanelProps) => {
  return (
    <div className="bg-appraisal-red w-full max-w-4xl p-8 rounded-lg shadow-2xl">
      <div className="flex items-center justify-center gap-2">
        <span className="text-black font-noto-sans font-black text-6xl md:text-8xl">
          ¥
        </span>
        <div className="flex gap-1">
          {value !== null && (
            <span className="text-black font-noto-sans font-black text-6xl md:text-8xl tracking-wider">
              {formatCurrency(value)}
            </span>
          )}
          {value === null && (
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
