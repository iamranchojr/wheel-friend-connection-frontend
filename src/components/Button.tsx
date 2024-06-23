import { ButtonHTMLAttributes } from 'react';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'danger';
  loading?: boolean;
}

export default function Button({
  children,
  variant = 'default',
  loading = false,
  ...props
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
      {...props}>
      {children}
      {loading && (
        <Spinner
          color={variant == 'default' ? '#000' : '#fff'}
          className="ml-2 mt-[3px]"
          size={15}
        />
      )}
    </button>
  );
}
