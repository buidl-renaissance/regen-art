// Function to extract event data from Resident Advisor event pages
export function extractRAEventData() {
  console.log('Extracting Resident Advisor event data');
  
  // Find all event listing cards on the page
  const eventCards = document.querySelectorAll('[data-testid="event-listing-card"]');
  
  if (!eventCards || eventCards.length === 0) {
    console.log('No event cards found on the page');
    return [];
  }
  
  console.log(`Found ${eventCards.length} event cards`);
  
  // Extract data from each event card
  const events = Array.from(eventCards).map(card => {
    try {
      // Extract event title
      const titleElement = card.querySelector('[data-pw-test-id="event-title-link"]');
      const title = titleElement?.textContent?.trim() || '';
      
      // Extract event URL
      const linkElement = card.querySelector('[data-pw-test-id="event-title-link"]');
      const url = linkElement?.getAttribute('href') || '';
      const fullUrl = url.startsWith('http') ? url : `https://ra.co${url}`;
      
      // Extract event date - primarily from the grouped header heading
      let dateText = '';
      
      // Look for the date in the parent element's h3 tag
      const parentElement = card.parentElement;
      if (parentElement) {
        const headings = parentElement.getElementsByTagName('h3');
        if (headings && headings.length > 0) {
          dateText = headings[0].innerText.trim() || '';
          console.log('Found date in parent heading:', dateText);
        }
      }
      
      // Fallback: Look for date within the card itself if grouped header approach failed
      if (!dateText) {
        const dateElement = card.querySelector('[data-testid="date-details"]');
        if (dateElement) {
          dateText = dateElement.textContent?.trim() || '';
        }
      }
      
      // Last resort: Look for any element with date-related attributes
      if (!dateText) {
        const possibleDateElements = card.querySelectorAll('[data-test-id*="date"], [data-testid*="date"], [aria-label*="date"]');
        if (possibleDateElements.length > 0) {
          dateText = possibleDateElements[0].textContent?.trim() || '';
        }
      }
      
      // Extract artists/lineup
      const lineupElement = card.querySelector('[data-test-id="artists-lineup"]');
      const lineup = lineupElement?.textContent?.trim() || '';
      
      // Extract venue name
      const venueElement = card.querySelector('[data-pw-test-id="event-venue-link"]');
      const venue = venueElement?.textContent?.trim() || '';
      
      // Extract venue URL
      const venueUrl = venueElement?.getAttribute('href') || '';
      const fullVenueUrl = venueUrl.startsWith('http') ? venueUrl : `https://ra.co${venueUrl}`;
      
      // Extract image URL
      const imageElement = card.querySelector('img');
      const imageUrl = imageElement?.getAttribute('src') || '';
      
      // Extract attendee count if available
      const attendeeElement = card.querySelector('[data-testid="meta-text"]');
      const attendeeCount = attendeeElement?.textContent?.trim() || '';
      
      // Determine if event is ticketed
      const isTicketed = card.querySelector('[data-test-id="ticketed-event"]') !== null;
      
      return {
        title,
        url: fullUrl,
        date: dateText,
        lineup,
        venue,
        venueUrl: fullVenueUrl,
        imageUrl,
        attendeeCount,
        isTicketed
      };
    } catch (error) {
      console.error('Error extracting event data:', error);
      return null;
    }
  }).filter(Boolean);
  
  console.log('Extracted events:', events);
  return events;
}

// Function to check if we're on a Resident Advisor page
export function isResidentAdvisorPage() {
  return document.location.href.includes('ra.co');
}

// Message handler for Chrome extension communication
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message, sender, sendResponse);
  if (message.type === 'EXTRACT_RA_EVENT_DATA') {
    const events = extractRAEventData();
    sendResponse(events);
    return true; // Keep the message channel open for async response
  }
});
