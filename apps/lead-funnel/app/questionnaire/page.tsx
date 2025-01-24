'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EventPreferences } from '../components/event-preferences';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReloadIcon } from '@radix-ui/react-icons';

const QuestionaireCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [eventPreferences, setEventPreferences] = useState<EventPreferences>({
    customIdea: '',
  });
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      const response = await fetch('/api/submit-questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, eventPreferences }),
      });

      const result = await response.json();

      if (result.success && typeof email === 'string') {
        router.push(`/checkout?email=${encodeURIComponent(email!)}`);
      } else {
        setError(result.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Event Preferences
        </CardTitle>
        <CardDescription className="text-center mt-2">
          Help us tailor your experience!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <EventPreferences
            preferences={eventPreferences}
            onChange={setEventPreferences}
          />
          <Button className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Continue to Checkout'
            )}
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default function QuestionnairePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 flex items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <QuestionaireCard />
      </Suspense>
    </div>
  );
}
