import React, { useState, useEffect } from 'react';
import Button from './Button';
// import { createEvent } from '../components/dpop';

interface RAEventData {
  title: string;
  date: string;
  venue: string;
  venueUrl: string;
  lineup: string[];
  description: string;
  imageUrl: string;
  source: string;
  ticketUrl: string;
}

const RAEventExtractor: React.FC = () => {
  const [eventsData, setEventsData] = useState<RAEventData[] | null>(null);

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
            { type: 'EXTRACT_RA_EVENT_DATA' },
            (response: RAEventData[]) => {
              if (chrome.runtime.lastError) {
                console.error('Error:', chrome.runtime.lastError.message);
                alert(
                  'Could not extract event data. Make sure you are on a Resident Advisor event page.'
                );
                return;
              }
              console.log('Extracted events:', [...response]);
              setEventsData([...response]);
            }
          );
        }
      }
    );
  };

  const handleSaveEvent = async (eventData: RAEventData[]) => {
    try {
      console.log('Saving event:', eventData);
    //   const event = await createEvent({
    //     title: eventData.title,
    //     content: eventData.description,
    //     data: {
    //       date: eventData.date,
    //       venue: eventData.venue,
    //       lineup: eventData.lineup,
    //       image: eventData.imageUrl,
    //       source: eventData.source,
    //       ticketUrl: eventData.ticketUrl
    //     },
    //   });
    //   console.log('Event created:', eventData);
    //   alert('Event saved successfully: ' + event.title);
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

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
          Extract RA Event
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
          {Array.isArray(eventsData) && eventsData.map((eventData, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {eventData.imageUrl && (
                <div style={{ flex: 1 }}>
                  <img
                    src={eventData.imageUrl}
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
                    href={eventData.venueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {eventData.venue}  
                  </a>
                </p>
                {/* {eventData.lineup && eventData.lineup.length > 0 && (
                  <div>
                    <strong>Lineup:</strong>
                    <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                      {eventData.lineup.map((artist, index) => (
                        <li key={index}>{artist}</li>
                      ))}
                    </ul>
                  </div>
                )}   */}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RAEventExtractor;

