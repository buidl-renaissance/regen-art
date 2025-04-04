import { useState, useEffect, useCallback } from 'react';
import { DPoPEvent, getEvent } from '@gods.work/utils';

/**
 * Custom hook to fetch and manage a DPoP event by slug
 * 
 * @param slug - The event slug to fetch
 * @returns Object containing the event data, loading state, and any error
 */
export function useEvent(slug: string | undefined) {
  const [event, setEvent] = useState<DPoPEvent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const eventData = await getEvent(slug);
      setEvent(eventData);
    } catch (err) {
      console.error('Error fetching event:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch event');
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return { event, isLoading, error, refetch: fetchEvent };
}


