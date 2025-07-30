import { Skeleton } from '@/components/ui/skeleton';

const LoadingFallback = () => {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="w-full h-16 border-b">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-4">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-6 w-16" />
            ))}
          </div>
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-12 w-96 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback;