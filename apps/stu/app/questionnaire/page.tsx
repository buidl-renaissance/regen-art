'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { EventPreferences } from '../components/event-preferences';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { getEmail } from '../../lib/utils';

const QuestionaireCard = () => {
  const router = useRouter();
  const email = getEmail();
  const [eventPreferences, setEventPreferences] = useState<EventPreferences>({
    customIdea: '',
  });
  const [emailInput, setEmailInput] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      // Save questionnaire data to localStorage
      localStorage.setItem(
        'questionnaire',
        JSON.stringify({
          eventPreferences,
          timestamp: new Date().toISOString(),
        })
      );

      const emailToUse = email || emailInput;

      if (emailToUse) {
        const response = await fetch('/api/submit-questionnaire', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailToUse, eventPreferences }),
        });

        const result = await response.json();

        if (result.success) {
          if (email) {
            router.push(`/events`);
            // router.push(`/build-profile`);
          } else {
            router.push(`/learn-more`);
          }
        } else {
          setError(result.error || 'An error occurred. Please try again.');
        }
      } else {
        router.push(`/subscribe`);
      }
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          What Excites You? Let Us Know!
        </CardTitle>
        <CardDescription className="mt-2">
          We're curating events tailored to our members' passions. Which of
          these spark your interest?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <EventPreferences
            preferences={eventPreferences}
            onChange={setEventPreferences}
          />
          {!email && (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
          )}
          <Button className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit'
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
