import React, { useState, useEffect } from 'react';
import Button from './Button';
import { postRAEvents } from './dpop';
import { RAEventData } from './interfaces';
import { convertWebpToJpg } from '../utils/image-converter';
import { getCurrentPageUrl, isRAEventsListingPage } from '../utils/is-url';

const RAEventsExtractor: React.FC = () => {
  const [eventsData, setEventsData] = useState<RAEventData[] | null>(null);
  const [shouldShow, setShouldShow] = useState<boolean>(false);

  useEffect(() => {
    const checkPage = async () => {
      const url = await getCurrentPageUrl();
      console.log("EVENTS PAGE LOCATION: ", url, isRAEventsListingPage(url));
      if (isRAEventsListingPage(url)) {
        setShouldShow(true);
      }
    };
    checkPage();
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      (message: { type: string; data: RAEventData[] }) => {
        if (message.type === 'RA_EVENT_DATA') {
          console.log('Received RA event data:', message.data);
          setEventsData(message.data);
        }
      }
    );
  }, []);

  const handleExtractEventData = () => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs: chrome.tabs.Tab[]) {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { type: 'EXTRACT_RA_EVENTS_DATA' },
            async (response: RAEventData[]) => {
              if (chrome.runtime.lastError) {
                console.error('Error:', chrome.runtime.lastError.message);
                alert(
                  'Could not extract event data. Make sure you are on a Resident Advisor event page.'
                );
                return;
              }

              console.log('Extracted events:', [...response]);

              const convertedEvents = await Promise.all(response.map(async (event) => {
                if (event.data.image_url) {
                  event.data.image_url = await convertWebpToJpg(event.data.image_url);
                }
                return event;
              }));

              console.log('Converted events:', [...convertedEvents]);

              setEventsData([...convertedEvents]);
            }
          );
        }
      }
    );
  };

  const handleSaveEvent = async (eventData: RAEventData[]) => {
    try {
      const events = await postRAEvents(eventData);
      alert('Successfully posted events: ' + events.length);
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  if (!shouldShow) {
    return null;
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <Button
          onClick={handleExtractEventData}
          variant="primary"
          size="medium"
          style={{
            padding: '10px 15px',
          }}
        >
          Extract RA Events
        </Button>

        {eventsData && (
          <Button
            onClick={() => handleSaveEvent(eventsData)}
            variant="success"
            size="medium"
            style={{
              padding: '10px 15px',
            }}
          >
            Save Event
          </Button>
        )}
      </div>
      {eventsData && (
        <div
          style={{
            margin: '20px 0',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
          }}
        >
          <h3>Events</h3>
          {Array.isArray(eventsData) &&
            eventsData.map((eventData, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                {eventData.data.image_url && (
                  <div style={{ flex: 1 }}>
                    <img
                      src={eventData.data.image_url}
                      alt={eventData.title}
                      style={{ maxWidth: '100%', borderRadius: '4px' }}
                    />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <h4>{eventData.title}</h4>
                  <p>
                    <strong>Date:</strong> {eventData.date}
                  </p>
                  <p>
                    <strong>Venue:</strong>{' '}
                    <a
                      href={eventData.data.venue_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {eventData.data.venue}
                    </a>
                  </p>
                  <p>
                    <strong>Lineup:</strong>
                    {eventData.data.lineup}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default RAEventsExtractor;
