interface TextAreaProps {
  label?: string;
}

export default function TextArea({ label }: TextAreaProps) {
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
      />
    </div>
  );
}
