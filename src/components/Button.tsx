interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export const Button = ({ onClick, text, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};
