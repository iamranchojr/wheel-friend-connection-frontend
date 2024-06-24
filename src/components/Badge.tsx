interface BadgeProps {
  label: string;
  variant: 'default' | 'warning' | 'success';
}

export default function Badge({ label, variant }: BadgeProps) {
  return (
    <span
      className={`${
        variant == 'success'
          ? 'bg-green-100 text-green-800'
          : variant == 'warning'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-blue-100 text-blue-800'
      } text-sm font-medium me-2 px-2.5 py-0.5 rounded-lg`}>
      {label}
    </span>
  );
}
