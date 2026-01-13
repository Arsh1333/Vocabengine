const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mt-8 rounded-xl border border-red-500/50 bg-red-900/20 p-5 text-center">
      <p className="font-medium text-red-400">
        The word maybe a unique label for specific entities, not general
        concepts needing definition or not found in our library
      </p>
    </div>
  );
};

export default ErrorMessage;
