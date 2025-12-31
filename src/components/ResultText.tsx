import { formatCurrency } from '../utils/appraisalGenerator';

interface ResultTextProps {
  value: number;
  show: boolean;
}

const ResultText = ({ value, show }: ResultTextProps) => {
  return (
    <div
      className={`
        bg-appraisal-brown text-white
        font-noto-sans font-bold
        text-2xl md:text-4xl
        py-6 px-8 rounded-lg
        transition-opacity duration-500
        ${show ? 'opacity-100 animate-fade-in' : 'opacity-0'}
      `}
    >
      {formatCurrency(value)}円です！
    </div>
  );
};

export default ResultText;
