interface EmptyStateMessageProps {
  message: string;
}

function EmptyStateMessage({ message }: EmptyStateMessageProps) {
  return (
    <div className="py-6 text-center">
      <p className="text-sm font-medium text-ink-soft">{message}</p>
    </div>
  );
}

export default EmptyStateMessage;
