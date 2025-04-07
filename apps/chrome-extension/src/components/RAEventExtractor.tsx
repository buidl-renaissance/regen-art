import React, { useState, useEffect } from 'react';
import Button from './Button';
import { postRAEvent } from './dpop';
import { RAEventData } from './interfaces';
import { isRAEventPage } from '../utils/is-url';
import { getCurrentPageUrl } from '../utils/is-url';
import { convertWebpToJpg } from '../utils/image-converter';

const RAEventExtractor: React.FC = () => {
  const [eventData, setEventData] = useState<RAEventData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [shouldShow, setShouldShow] = useState<boolean>(false);

  useEffect(() => {
    const checkPage = async () => {
      const url = await getCurrentPageUrl();
      console.log('EVENT PAGE LOCATION: ', url, isRAEventPage(url));
      if (isRAEventPage(url)) {
        setShouldShow(true);
      }
    };
    checkPage();
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      (message: { type: string; data: RAEventData }) => {
        if (message.type === 'RA_EVENT_DATA') {
          console.log('Received RA event data:', message.data);
          setEventData(message.data);
        }
      }
    );
  }, []);

  const handleExtractEventData = () => {
    setLoading(true);
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs: chrome.tabs.Tab[]) {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { type: 'EXTRACT_RA_EVENT_DATA' },
            async (response: RAEventData) => {
              setLoading(false);
              if (chrome.runtime.lastError) {
                console.error('Error:', chrome.runtime.lastError.message);
                alert(
                  'Could not extract event data. Make sure you are on a Resident Advisor event page.'
                );
                return;
              }

              console.log('Extracted event:', response);

              // Convert image URL from webp to jpg if it exists
              if (response.data.image_url) {
                try {
                  const convertedImageUrl = await convertWebpToJpg(
                    response.data.image_url
                  );
                  response.data.image_url = convertedImageUrl;
                  console.log('Converted image URL:', convertedImageUrl);
                } catch (error) {
                  console.error('Error converting image:', error);
                }
              }
              setEventData(response);
            }
          );
        }
      }
    );
  };

  const handleSaveEvent = async (eventData: RAEventData) => {
    try {
      setLoading(true);
      const events = await postRAEvent(eventData);
      setLoading(false);
      alert('Successfully posted events: ' + events.length);
    } catch (error) {
      setLoading(false);
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
          disabled={loading}
        >
          {loading ? 'Extracting...' : 'Extract RA Event'}
        </Button>
      </div>
      {eventData && (
        <div
          style={{
            margin: '20px 0',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        >
          {eventData && (
            <div
              key={eventData.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'stretch',
                textAlign: 'left',
              }}
            > 
              <div style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: '1rem', 
                alignItems: 'flex-start' 
              }}>
                {eventData.data.image_url && (
                  <div style={{ flex: '0 0 40%' }}>
                    <img
                      src={eventData.data.image_url}
                      alt={eventData.title}
                      style={{
                        maxWidth: '100%',
                        borderRadius: '4px',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
                      }}
                    />
                  </div>
                )}
                <div style={{ flex: '1 1 60%' }}>
                  <h4
                    style={{
                      fontSize: '1.2rem',
                      marginTop: '0',
                      marginBottom: '10px',
                      color: '#111',
                    }}
                  >
                    {eventData.title}
                  </h4>
                  <p style={{ margin: '8px 0', color: '#222' }}>
                    <strong>Date:</strong> {eventData.date}
                  </p>
                  {eventData.data.start_time && (
                    <p style={{ margin: '8px 0', color: '#222' }}>
                      <strong>Time:</strong> {eventData.data.start_time}
                      {eventData.data.end_time && ` - ${eventData.data.end_time}`}
                    </p>
                  )}
                  <p style={{ margin: '8px 0', color: '#222' }}>
                    <strong>Venue:</strong>{' '}
                    {eventData.data.venue_url ? (
                      <a
                        href={eventData.data.venue_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'underline', color: '#0056b3' }}
                      >
                        {eventData.data.venue}
                      </a>
                    ) : (
                      eventData.data.venue
                    )}
                  </p>
                  {eventData.data.ticket_prices && (
                    <p style={{ margin: '8px 0', color: '#222' }}>
                      <strong>Cost:</strong> {eventData.data.ticket_prices}
                    </p>
                  )}
                  {eventData.data.attendee_count && (
                    <p style={{ margin: '8px 0', color: '#222' }}>
                      <strong>Attendees:</strong> {eventData.data.attendee_count}
                    </p>
                  )}
                  {eventData.data.lineup && eventData.data.lineup.length > 0 && (
                    <p style={{ margin: '8px 0', color: '#222' }}>
                      <strong>Lineup:</strong>{' '}
                      {Array.isArray(eventData.data.lineup)
                        ? eventData.data.lineup.map((artist, index) => (
                            <span key={index}>
                              {artist.url ? (
                                <a
                                  href={artist.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    textDecoration: 'underline',
                                    color: '#0056b3',
                                  }}
                                >
                                  {artist.name}
                                </a>
                              ) : (
                                artist.name
                              )}
                              {index < eventData.data.lineup.length - 1
                                ? ', '
                                : ''}
                            </span>
                          ))
                        : eventData.data.lineup}
                    </p>
                  )}
                  {eventData.data.description && (
                    <p style={{ margin: '8px 0', color: '#222' }}>
                      <strong>Description:</strong>{' '}
                      <span style={{ fontStyle: 'italic', color: '#333' }}>
                        {eventData.data.description.substring(0, 150)}
                        {eventData.data.description.length > 150 ? '...' : ''}
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={() => handleSaveEvent(eventData)}
                  variant="success"
                  size="medium"
                  style={{
                    padding: '10px 15px',
                  }}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Event'}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default RAEventExtractor;
