import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-2/3 space-y-6">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-12 w-full max-w-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
                <div className="flex gap-4 pt-4">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-36" />
                </div>
              </div>
              <div className="md:w-1/3">
                <Skeleton className="h-80 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-8 w-3/4" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            
            <div className="pt-8 space-y-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
