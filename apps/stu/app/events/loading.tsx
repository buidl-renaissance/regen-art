import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card"
import { Skeleton } from "../../components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-64 bg-white/50" />
          <Skeleton className="h-10 w-32 bg-white/50" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 bg-white/50" />
                <Skeleton className="h-4 w-1/2 bg-white/50 mt-2" />
              </CardHeader>
              <CardContent className="flex-grow">
                <Skeleton className="h-20 w-full bg-white/50" />
                <Skeleton className="h-4 w-3/4 bg-white/50 mt-2" />
                <Skeleton className="h-4 w-1/2 bg-white/50 mt-2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full bg-white/50" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

