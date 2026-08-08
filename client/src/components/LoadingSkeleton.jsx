const LoadingSkeleton = ({ count = 1, type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="holo-card p-6 animate-pulse">
            <div className="h-6 bg-white/10 rounded mb-4 w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-white/5 rounded"></div>
              <div className="h-4 bg-white/5 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'event') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="holo-card p-6 animate-pulse">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-white/10 rounded"></div>
              <div className="flex-1">
                <div className="h-5 bg-white/10 rounded mb-3 w-1/2"></div>
                <div className="h-4 bg-white/5 rounded mb-2"></div>
                <div className="h-4 bg-white/5 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
