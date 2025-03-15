import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Achievement {
  type: 'D' | 'T' | 'P'
  count: number
  total: number
  user: {
    name: string
    title: string
    avatar: string
  }
}

const achievements: Achievement[] = [
  { type: 'D', count: 1, total: 1, user: { name: 'Nathan Karinen', title: 'Graphic Designer, DJ and Producer', avatar: '/placeholder.svg?height=48&width=48' } },
  { type: 'D', count: 1, total: 1, user: { name: 'Nathan Karinen', title: 'Graphic Designer, DJ and Producer', avatar: '/placeholder.svg?height=48&width=48' } },
  { type: 'T', count: 1, total: 1, user: { name: 'Nathan Karinen', title: 'Graphic Designer, DJ and Producer', avatar: '/placeholder.svg?height=48&width=48' } },
  { type: 'D', count: 1, total: 1, user: { name: 'Nathan Karinen', title: 'Graphic Designer, DJ and Producer', avatar: '/placeholder.svg?height=48&width=48' } },
  { type: 'P', count: 1, total: 1, user: { name: 'Nathan Karinen', title: 'Graphic Designer, DJ and Producer', avatar: '/placeholder.svg?height=48&width=48' } },
  { type: 'D', count: 1, total: 1, user: { name: 'Nathan Karinen', title: 'Graphic Designer, DJ and Producer', avatar: '/placeholder.svg?height=48&width=48' } },
]

const summaryStats = [
  { type: 'D', count: 4, total: 7 },
  { type: 'T', count: 1, total: 1 },
  { type: 'P', count: 1, total: 1 },
  { type: 't', count: 0, total: 1 },
]

export default function RewardsPage() {
  return (
    <main className="min-h-screen bg-[#eeeeee] py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <h1 className="text-[#222222] text-4xl font-bold text-center mb-8">
          You've Earned
        </h1>

        {/* Achievement Summary */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {summaryStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#dddddd] flex items-center justify-center">
                <span className="text-xl font-medium text-[#222222]">
                  {stat.count}/{stat.total} {stat.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Invite Friends Button */}
        <Button 
          className="w-full bg-[#333333] hover:bg-[#222222] text-white rounded-none h-12 mb-8"
        >
          Invite Friends
        </Button>

        {/* Achievement List */}
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <Card key={index} className="p-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#dddddd] flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-medium text-[#222222]">
                  1 {achievement.type}
                </span>
              </div>
              <div className="flex items-center gap-4 flex-1">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={achievement.user.avatar} alt={achievement.user.name} />
                  <AvatarFallback>NK</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg text-[#222222]">{achievement.user.name}</h3>
                  <p className="text-[#222222]/80">{achievement.user.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}

