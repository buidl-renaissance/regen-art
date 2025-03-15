import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
// import { Button } from '@/components/ui/button';

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Membership Coming Soon!
          </CardTitle>
          <CardDescription className="text-center mt-2">
            Join our vibrant community of artists!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Membership Includes:</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">🎧</span>
                <span>Monday Open Decks – Practice your DJ skills</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✨</span>
                <span>
                  Rotating Tuesday Workshops – Learn new skills and techniques
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🖼️</span>
                <span>
                  Art Night Wednesdays – Connect, collaborate, and create
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🍽️</span>
                <span>
                  Sunday Community Dinner – Share a meal with fellow members
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🎨</span>
                <span>
                  Sunday Open Studio – Work on your projects after dinner
                </span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Perks for Members:</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">👕</span> Welcome tie-dye shirt to kick
                off your journey.
              </li>
              <li className="flex items-center">
                <span className="mr-2">🖼️</span> Access to custom-stretched
                canvas frames.
              </li>
              <li className="flex items-center">
                <span className="mr-2">🎧</span> Discounted rates on DJ and
                speaker equipment.
              </li>
              <li className="flex items-center">
                <span className="mr-2">🏙️</span>
                <span>Exclusive deals and perks at local establishments</span>
              </li>
            </ul>
            {/* <p className="text-center text-2xl font-bold mt-4">
              Join for only $20/month
            </p> */}
          </div>
          {/* <div className="flex justify-center mt-6">
            <Button asChild>
              <Link href="https://example.com/signup">Sign Up Now</Link>
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
