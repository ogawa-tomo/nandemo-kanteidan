interface AppraisalButtonProps {
  onClick: () => void;
  disabled: boolean;
  label: string;
}

const AppraisalButton = ({ onClick, disabled, label }: AppraisalButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        bg-yellow-500 hover:bg-yellow-600
        text-gray-900 font-bold
        py-4 px-8 rounded-full
        transition-all duration-200
        transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl
      "
    >
      {label}
    </button>
  );
};

export default AppraisalButton;
