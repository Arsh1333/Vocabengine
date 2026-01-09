const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mt-8 rounded-xl border border-red-500/50 bg-red-900/20 p-5 text-center">
      <p className="font-medium text-red-400">{message}</p>
    </div>
  );
};

export default ErrorMessage;
