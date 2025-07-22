export function IncidentCardSkeleton() {
  return (
    <div className="bg-slate-700 rounded-lg p-4 flex items-center space-x-4 animate-pulse">
      <div className="flex-shrink-0">
        <div className="h-6 w-6 bg-slate-600 rounded-md"></div>
      </div>
      <div className="flex-grow">
        <div className="h-4 bg-slate-600 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-slate-600 rounded w-1/2"></div>
      </div>
      <div className="h-8 w-8 bg-slate-600 rounded-full"></div>
    </div>
  );
}
