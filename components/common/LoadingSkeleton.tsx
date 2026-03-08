export function ImageSkeleton() {
  return (
    <div className="aspect-[4/5] relative overflow-hidden rounded-lg bg-gray-200 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
    </div>
  );
}

export function VideoCardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="aspect-[16/9] relative overflow-hidden rounded-lg bg-gray-200 animate-pulse" />
      <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="h-48 bg-gray-200 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
        </div>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
    </div>
  );
}
