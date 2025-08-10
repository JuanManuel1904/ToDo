const Button = ({ color, text, onClick, type, className = '' }) => {
  const baseClasses =
    'rounded-lg px-4 py-2 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 text-white text-sm sm:text-base font-semibold';

  const colorClasses = {
    rose: 'bg-rose-500 hover:bg-rose-400',
    blue: 'bg-blue-500 hover:bg-blue-400',
    green: 'bg-green-500 hover:bg-green-400',
  };

  return (
    <button
      className={`${baseClasses} ${colorClasses[color]} ${className}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
