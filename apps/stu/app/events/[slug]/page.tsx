import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { format, parseISO } from 'date-fns'

// Event type (same as in the events page)
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

async function getEvent(slug: string): Promise<Event | null> {
  try {
    const response = await fetch(`https://api.detroiter.network/api/events/${slug}`, { next: { revalidate: 3600 } });
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch event');
    }
    const data = await response.json();
    return data.event;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function EventPage({ params }: PageProps) {
  const event = await getEvent((await params).slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{event.title}</CardTitle>
            <CardDescription>
              {format(parseISO(event.start_date), 'MMMM d, yyyy')} | {format(parseISO(event.start_date), 'h:mm a')} - {format(parseISO(event.end_date), 'h:mm a')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div dangerouslySetInnerHTML={{ __html: event.excerpt }} />
            {event.venue && (
              <div>
                <h3 className="font-semibold">Location</h3>
                <p>{event.venue.title}</p>
              </div>
            )}
            {event.categories.length > 0 && (
              <div>
                <h3 className="font-semibold">Categories</h3>
                <p>{event.categories.join(', ')}</p>
              </div>
            )}
            <div>
              <h3 className="font-semibold">Event ID</h3>
              <p>{event.id}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild variant="outline">
              <Link href="/events">Back to Events</Link>
            </Button>
            <Button>RSVP</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
