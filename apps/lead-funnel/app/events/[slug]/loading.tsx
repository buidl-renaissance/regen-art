import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 bg-white/50" />
            <Skeleton className="h-4 w-1/2 bg-white/50 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-20 w-full bg-white/50" />
            <Skeleton className="h-4 w-3/4 bg-white/50" />
            <Skeleton className="h-4 w-1/2 bg-white/50" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-10 w-24 bg-white/50" />
            <Skeleton className="h-10 w-24 bg-white/50" />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

