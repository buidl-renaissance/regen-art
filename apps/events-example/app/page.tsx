import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Newspaper,
  ArrowRight,
  ThumbsUp,
  MessageSquare,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Weather } from '@/components/weather';
import { RewardsTile } from '@/components/rewards-tile';
import { EventCard } from '@/components/event-card';
import { Card, CardContent } from '@/components/ui/card';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      {/* <style jsx global>
        {styles}
      </style> */}
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative h-[500px]">
          <Image
            src="/renaissance.png"
            alt="Detroit Cityscape"
            width={1000}
            height={500}
            className="absolute inset-0 object-cover object-top w-full h-full brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70">
            <div className="container mx-auto px-4 py-6 h-full flex flex-col justify-end">
              {/* Top Bar */}
              {/* <div className="flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">17 D</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm">5 🎟</span>
                </div>
                <Button variant="outline" className="bg-white/20 border-0 text-white hover:bg-white/30">
                  John G
                </Button>
              </div> */}

              {/* Hero Content */}
              <div className="space-y-4 mb-12 mt-12">
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  Welcome to the
                  <br />
                  Renaissance City
                </h1>
                <p className="text-xl text-white/90">
                  Unlock the rich tapestry of food, arts, and culture that
                  Detroit has to offer.
                </p>
                <Weather />
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        {/* <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase()}`}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-full border-2 border-neutral-200 flex items-center justify-center">
                  {category.icon}
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div> */}

        {/* Discover Organizations Section */}
        {/* <div className="w-full overflow-hidden mt-8">
          <div className="container mx-auto px-4 mb-4">
            <h2 className="text-2xl font-semibold">Join a Community</h2>
          </div>
          <div className="relative w-full">
            <div className="flex overflow-x-auto pb-4 px-4 space-x-4 scrollbar-hide">
              {communities.map((org) => (
                <Link key={org.id} href={`/community/${org.id}`} className="block hover:bg-muted/50 transition-colors">
                  <Card className="flex-shrink-0 w-[300px]">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={org.image || "/placeholder.svg"}
                            alt={org.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{org.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{org.members} members</span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-sm line-clamp-2">{org.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-background to-transparent w-4" />
            <div className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-background to-transparent w-4" />
          </div>
        </div> */}

        {/* Rewards Tile and Tabs */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mt-4 space-y-2">
                {events.map((event: any) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href="/events"
                  className="text-primary hover:underline flex items-center"
                >
                  <span>View All Events</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              {/* <Tabs defaultValue="events" className="w-full">
                <TabsList>
                  <TabsTrigger value="events" className="flex-1">
                    Events
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="flex-1">
                    Activity
                  </TabsTrigger>
                  <TabsTrigger value="news" className="flex-1">
                    News
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="events">
                  <div className="mt-4 space-y-2">
                    {events.map((event) => (
                      <EventCard key={event.id} {...event} />
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link href="/events" className="text-primary hover:underline flex items-center">
                      <span>View All Events</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="activity">
                  <div className="mt-8 space-y-6">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={activity.userImage || "/placeholder.svg"}
                            alt={activity.userName}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.userName}</span> {activity.action}
                          </p>
                          <span className="text-sm text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="news">
                  <div className="mt-8 space-y-6">
                    {newsItems.map((news) => (
                      <div key={news.id} className="group">
                        <Link href={`/news/${news.id}`}>
                          <div className="flex gap-6 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Newspaper className="w-4 h-4" />
                                <span>{news.source}</span>
                                <span>•</span>
                                <span>{news.date}</span>
                              </div>
                              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                {news.title}
                              </h3>
                              <p className="text-muted-foreground">{news.excerpt}</p>
                              <div className="flex items-center gap-6 pt-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>{news.likes}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MessageSquare className="w-4 h-4" />
                                  <span>{news.comments}</span>
                                </div>
                                <div className="ml-auto">
                                  <Button variant="ghost" size="sm" className="group-hover:text-primary">
                                    Read more <ArrowRight className="w-4 h-4 ml-2" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            {news.image && (
                              <div className="hidden sm:block w-48 h-32">
                                <Image
                                  src={news.image || "/placeholder.svg"}
                                  alt={news.title}
                                  width={192}
                                  height={128}
                                  className="rounded-lg object-cover w-full h-full"
                                />
                              </div>
                            )}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs> */}
            </div>
            {/* <div>
              <RewardsTile points={750} nextRewardPoints={1000} tier="Silver" />
            </div> */}
          </div>
        </div>

        {/* Detroit Neighborhoods */}
        {/* <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-6">
            Explore Detroit Neighborhoods
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detroitNeighborhoods.map((neighborhood) => (
              <Card key={neighborhood.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={neighborhood.image || '/placeholder.svg'}
                    alt={neighborhood.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {neighborhood.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {neighborhood.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Known for:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {neighborhood.knownFor.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/neighborhood/${neighborhood.name
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                  >
                    <Button variant="outline" className="w-full">
                      Explore {neighborhood.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}
      </main>
    </>
  );
}

const categories = [
  { name: 'EAT', icon: '🍕' },
  { name: 'DRINK', icon: '🍹' },
  { name: 'PLAY', icon: '⚾' },
  { name: 'DANCE', icon: '🎵' },
  { name: 'LEARN', icon: '📚' },
  { name: 'NETWORK', icon: '🤝' },
];

async function getEvents() {
  const res = await fetch('https://api.detroiter.network/api/events'); 
  const result = await res.json();
  // console.log(result);
  return result.data;
}

  // return [
  //   {
  //     id: 1,
  //     date: 'June 3rd',
  //     time: '6 pm - 8 pm',
  //     title: 'Social Design Club',
  //     venue: 'Bamboo Detroit',
  //     description:
  //       'Join us at Social Design Club for in-person meetups where we chat...',
  //     image: '/placeholder.svg?height=128&width=128',
  //   },
  //   {
  //     id: 2,
  //     date: 'June 3rd',
  //     time: '10 pm - 2 am',
  //     title: 'Human Being',
  //     venue: 'SPRK BOX',
  //     description: 'DJs XSTRAKT and HULKOLAS : Master of Ceremonies Silan',
  //     image: '/placeholder.svg?height=128&width=128',
  //   },
  //   {
  //     id: 3,
  //     date: 'June 5th',
  //     time: '7 pm - 9 pm',
  //     title: 'Tech Meetup: AI in Detroit',
  //     venue: 'TechTown Detroit',
  //     description:
  //       "Explore the latest AI innovations shaping Detroit's tech scene",
  //     image: '/placeholder.svg?height=128&width=128',
  //   },
  // ];


const activities = [
  {
    id: 1,
    userName: 'Sarah Johnson',
    userImage: '/placeholder.svg?height=40&width=40',
    action: 'is attending Social Design Club',
    time: '2 hours ago',
  },
  {
    id: 2,
    userName: 'Mike Chen',
    userImage: '/placeholder.svg?height=40&width=40',
    action: 'commented on Detroit Art Festival',
    time: '3 hours ago',
  },
  {
    id: 3,
    userName: 'Emily Rodriguez',
    userImage: '/placeholder.svg?height=40&width=40',
    action: 'saved Electronic Music Showcase',
    time: '5 hours ago',
  },
];

const newsItems = [
  {
    id: 1,
    title: "Detroit's Creative Scene Continues to Thrive in 2024",
    excerpt:
      "New art galleries, music venues, and creative spaces are opening across the city, signaling a renaissance in Detroit's cultural landscape.",
    source: 'Detroit Arts Weekly',
    date: '2 hours ago',
    likes: 245,
    comments: 58,
    image: '/placeholder.svg?height=128&width=192',
  },
  {
    id: 2,
    title: 'Tech Startups Choose Detroit as Their New Home',
    excerpt:
      "More technology companies are setting up shop in Detroit, attracted by the city's growing innovation ecosystem and talented workforce.",
    source: 'Tech Detroit',
    date: '5 hours ago',
    likes: 189,
    comments: 42,
    image: '/placeholder.svg?height=128&width=192',
  },
  {
    id: 3,
    title: 'Local Food Scene Expands with New Restaurant Openings',
    excerpt:
      "Detroit's culinary landscape is growing with several new restaurants featuring diverse cuisines and innovative dining concepts.",
    source: 'Detroit Eats',
    date: '1 day ago',
    likes: 312,
    comments: 76,
    image: '/placeholder.svg?height=128&width=192',
  },
];

const communities = [
  {
    id: 1,
    name: 'Detroit Tech Hub',
    members: 1200,
    description:
      'A community for tech professionals and enthusiasts in Detroit',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 2,
    name: 'Motor City Creatives',
    members: 850,
    description: 'Bringing together artists, designers, and makers in Detroit',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 3,
    name: 'Detroit Foodies Unite',
    members: 1500,
    description: "Exploring Detroit's culinary scene and food culture",
    image: '/placeholder.svg?height=100&width=100',
  },
];

const detroitNeighborhoods = [
  {
    id: 1,
    name: 'Midtown',
    description:
      'A vibrant cultural district home to museums, universities, and trendy restaurants',
    image: '/placeholder.svg?height=200&width=400',
    link: '/neighborhood/midtown',
    knownFor: [
      'Detroit Institute of Arts',
      'Wayne State University',
      'Diverse dining scene',
    ],
  },
  {
    id: 2,
    name: 'Corktown',
    description:
      "Detroit's oldest neighborhood, known for its historic architecture and emerging food scene",
    image: '/placeholder.svg?height=200&width=400',
    link: '/neighborhood/corktown',
    knownFor: [
      'Michigan Central Station',
      'Trendy restaurants and bars',
      "Annual St. Patrick's Day Parade",
    ],
  },
  {
    id: 3,
    name: 'Eastern Market',
    description:
      'A historic commercial district centered around its vibrant farmers market',
    image: '/placeholder.svg?height=200&width=400',
    link: '/neighborhood/eastern-market',
    knownFor: [
      'Farmers Market',
      'Street art and murals',
      'Food processing businesses',
    ],
  },
  {
    id: 4,
    name: 'Downtown',
    description:
      "The central business district and heart of Detroit's renaissance",
    image: '/placeholder.svg?height=200&width=400',
    link: '/neighborhood/downtown',
    knownFor: [
      'Campus Martius Park',
      'Detroit RiverWalk',
      'Professional sports venues',
    ],
  },
  {
    id: 5,
    name: 'New Center',
    description:
      'A historic commercial and residential district north of Midtown',
    image: '/placeholder.svg?height=200&width=400',
    link: '/neighborhood/new-center',
    knownFor: ['Fisher Building', 'Motown Museum', 'Henry Ford Hospital'],
  },
  {
    id: 6,
    name: 'Mexicantown',
    description:
      'A vibrant neighborhood known for its Mexican-American culture and cuisine',
    image: '/placeholder.svg?height=200&width=400',
    link: '/neighborhood/mexicantown',
    knownFor: [
      'Authentic Mexican restaurants',
      'Cinco de Mayo celebrations',
      'Mexican-inspired architecture',
    ],
  },
];

const scrollbarHideClass = 'scrollbar-hide';

const styles = `
  .${scrollbarHideClass} {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .${scrollbarHideClass}::-webkit-scrollbar {
    display: none;
  }
`;
