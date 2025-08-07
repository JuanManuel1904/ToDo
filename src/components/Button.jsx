const Button = ({ color, text, onClick, type }) => {
  const colorClasses = {
    rose: 'bg-rose-500 hover:bg-rose-400',
    blue: 'bg-blue-500 hover:bg-blue-400',
    green: 'bg-green-500 hover:bg-green-400',
  };

  return (
    <button
      className={`${colorClasses[color]}-500 rounded-lg w-28 cursor-pointer transition delay-50 duration-300 ease-in-out hover:scale-110 hover:bg-${color}-400`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
