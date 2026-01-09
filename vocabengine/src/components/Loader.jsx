export default function Loader({ isLoading }) {
     if (!isLoading) return;
    return (
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-900/60 px-6 py-4">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent"></span>
          <span className="text-sm text-gray-300">Fetching meaning...</span>
        </div>
      </div>
    );
}