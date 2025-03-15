import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { format, parseISO } from 'date-fns'

// Updated Event type to match the API response
type Event = {
  id: number;
  title: string;
  cid: string;
  slug: string;
  host: string | null;
  venue: {
    id: number;
    title: string;
    cid: string;
    slug: string;
    geo: {
      lat: number;
      lng: number;
    }
  } | null;
  start_date: string;
  end_date: string;
  event_categories: Array<{
    term_id: number;
    name: string;
    slug: string;
    term_group: number;
  }>;
  categories: string[];
  excerpt: string;
  featured: boolean;
  image_data: string | null;
  image: string | null;
}

async function getEvents(): Promise<Event[]> {
  try {
    const response = await fetch('https://api.detroiter.network/api/events', { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export default async function CommunityEventsPage() {
  const events = await getEvents()

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Community Events</h1>
          <Button asChild>
            <Link href="/events/promote">Promote Your Event</Link>
          </Button>
        </div>
        {events.length === 0 ? (
          <p className="text-white text-center text-xl">No community events found. Check back later!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {event.title}
                  </CardTitle>
                  <CardDescription>
                    {format(parseISO(event.start_date), 'MMMM d, yyyy')} | {format(parseISO(event.start_date), 'h:mm a')} - {format(parseISO(event.end_date), 'h:mm a')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div dangerouslySetInnerHTML={{ __html: event.excerpt }} />
                  {event.venue && (
                    <p className="mt-2"><strong>Location:</strong> {event.venue.title}</p>
                  )}
                  {event.categories.length > 0 && (
                    <p><strong>Categories:</strong> {event.categories.join(', ')}</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/community-events/${event.slug}`}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/join">Become a Member</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

