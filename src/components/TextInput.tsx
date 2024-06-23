interface TextInputProps {
  label?: string;
}

export default function TextInput({ label }: TextInputProps) {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          First name
        </label>
      )}
      <input
        type="text"
        id="first_name"
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-4 py-3"
        placeholder="John"
      />
    </div>
  );
}
