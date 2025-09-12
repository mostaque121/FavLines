interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message || message.length < 1) return null;

  return (
    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
      <span className="text-destructive">⚠</span>
      {message}
    </p>
  );
}
