import { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  yupProps?: any; // for yup data validation
  errorMessage?: string;
}

export default function TextArea({
  label,
  yupProps,
  errorMessage,
  ...props
}: TextAreaProps) {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <textarea
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-4 py-3"
        rows={3}
        {...props}
        {...yupProps}
      />

      {errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
}
