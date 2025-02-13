import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Bookmark, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Venue {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface EventCardProps {
  id: number;
  start_date: string;
  end_date: string;
  title: string;
  venue: Venue;
  description: string;
  image?: string;
}

export function EventCard({
  id,
  start_date,
  end_date,
  title,
  venue,
  description,
  image,
}: EventCardProps) {
  return (
    <Link
      href={`/event/${id}`}
      className="block hover:bg-muted/50 rounded-lg transition-colors"
    >
      <div className="flex gap-3 p-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-1">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {start_date} - {end_date}
              </span>
            </div>
            {/* <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{start_time} - {end_time}</span>
            </div> */}
          </div>
          <h3 className="text-base font-semibold mb-0.5 truncate">{title}</h3>
          {venue && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{venue.name}</span>
            </div>
          )}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          <div className="flex gap-1 mt-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {image && (
          <div className="hidden sm:block w-24 h-24 flex-shrink-0">
            <Image
              src={image || '/placeholder.svg'}
              alt={title}
              width={96}
              height={96}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
