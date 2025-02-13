import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Gift, Star } from 'lucide-react'
import Link from 'next/link'

interface RewardsTileProps {
  points: number
  nextRewardPoints: number
  tier: string
}

export function RewardsTile({ points, nextRewardPoints, tier }: RewardsTileProps) {
  const progress = (points / nextRewardPoints) * 100

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Rewards Program
        </CardTitle>
        <Gift className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 mr-1" />
            <span className="text-2xl font-bold">{points}</span>
          </div>
          <span className="text-sm text-muted-foreground">{tier} Tier</span>
        </div>
        <Progress value={progress} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground mb-4">
          {nextRewardPoints - points} points until next reward
        </p>
        <Link href="/rewards">
          <Button className="w-full">View Rewards</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

