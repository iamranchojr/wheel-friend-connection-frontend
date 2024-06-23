import { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'danger';
  otherProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  variant = 'default',
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${
        variant == 'primary'
          ? 'bg-gray-700 text-white hover:bg-gray-800'
          : variant == 'success'
          ? 'bg-green-600 text-white hover:bg-green-700'
          : variant == 'danger'
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'hover:bg-gray-100 text-gray-700'
      } border text-[15px] font-medium py-2 px-4 rounded-lg flex items-center gap-2`}
      onClick={onClick}>
      {children}
    </button>
  );
}
