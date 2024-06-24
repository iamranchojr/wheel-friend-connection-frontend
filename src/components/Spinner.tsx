import ClipLoader from 'react-spinners/ClipLoader';

interface SpinnerProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function Spinner({
  size = 15,
  color = '#fff',
  className = '',
}: SpinnerProps) {
  return (
    <div {...{ className }}>
      <ClipLoader size={size} color={color} />
    </div>
  );
}
