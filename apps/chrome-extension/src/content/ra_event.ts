import { RAEventData } from '../components/interfaces';

/**
 * Extracts event data from a Resident Advisor event page
 * @returns RAEventData object with event details
 */
export async function extractRAEventData(): Promise<RAEventData> {
  console.log('Extracting Resident Advisor event data from event page');

  try {
    // Extract event title
    const titleElement = document.querySelector('h1 span');
    const title = titleElement?.textContent?.trim() || '';

    // Extract event URL
    const url = window.location.href;

    // Extract event ID from URL
    const urlParts = url.split('/');
    const eventId = urlParts[urlParts.length - 1];

    // Extract date
    const dateElement = document.querySelector('a[href*="startDate"]');
    const dateText = dateElement?.textContent?.trim() || '';

    // Extract time
    // First try the new design with the Box component
    const timeContainer = document.querySelector('.Box-sc-abq4qd-0.kzsndX');
    let startTime = '';
    let endTime = '';

    if (timeContainer) {
      // New design
      const timeSpans = timeContainer.querySelectorAll('span');
      if (timeSpans.length >= 3) {
        startTime = timeSpans[0]?.textContent?.trim() || '';
        endTime = timeSpans[2]?.textContent?.trim() || '';
      }
    } else {
      // Fallback to old design
      const timeElements = document.querySelectorAll(
        '[data-tracking-id="event-detail-time"] span'
      );
      if (timeElements.length >= 3) {
        startTime = timeElements[0]?.textContent?.trim() || '';
        endTime = timeElements[2]?.textContent?.trim() || '';
      }
    }

    // Extract venue
    const venueElement = document.querySelector(
      '[data-pw-test-id="event-venue-link"], [data-tracking-id*="venue"]'
    );
    const venue = venueElement?.textContent?.trim() || '';

    // Extract venue URL
    const venueUrl = venueElement?.getAttribute('href') || '';
    const fullVenueUrl = venueUrl.startsWith('http')
      ? venueUrl
      : `https://ra.co${venueUrl}`;

    // Extract lineup
    // Look for lineup in the RA design
    const lineupSection = document.querySelector(
      '[data-tracking-id="event-detail-lineup"]'
    );
    let lineup: Array<{ name: string; url?: string }> = [];

    if (lineupSection) {
      // Get all links in the lineup section (artists with profiles)
      const lineupLinks = lineupSection.querySelectorAll('a');
      lineup = Array.from(lineupLinks)
        .map((link) => ({
          name: link.textContent?.trim() || '',
          url: (link.getAttribute('href')?.startsWith('http')
            ? link.getAttribute('href')
            : `https://ra.co${link.getAttribute('href') || ''}`) || '',
        }))
        .filter((item) => item.name);

      // Get the full lineup text content
      const lineupText = lineupSection.textContent || '';

      // Extract artists without links
      // First, create a string of all linked artists to exclude them
      const linkedArtistsText = lineup.map((artist) => artist.name).join('|');
      const linkedArtistsRegex = new RegExp(`(${linkedArtistsText})`, 'g');

      // Remove "Lineup" header and linked artists from the text
      const remainingText = lineupText
        .replace(/Lineup/i, '')
        .replace(linkedArtistsRegex, '')
        .replace(/\s+/g, ' ')
        .trim();

      // Split by common separators (commas, line breaks)
      const nonLinkedArtists = remainingText
        .split(/[,\n]/)
        .map((name) => name.trim())
        .filter((name) => name && name.length > 1) // Filter out empty strings and single characters
        .map((name) => ({ name }));

      // Combine both linked and non-linked artists
      lineup = [...lineup, ...nonLinkedArtists];
    } else {
      // Fallback to old selector
      const lineupElements = document.querySelectorAll(
        '[data-test-id="artists-lineup"] a'
      );
      lineup = Array.from(lineupElements)
        .map((el) => ({
          name: el.textContent?.trim() || '',
          url:
            (el.getAttribute('href')?.startsWith('http')
              ? el.getAttribute('href')
              : `https://ra.co${el.getAttribute('href') || ''}`) || '',
        }))
        .filter((item) => item.name);
    }

    // Extract description
    const descriptionElement = document.querySelector('#event-description');
    const description = descriptionElement?.textContent?.trim() || '';

    // Extract image URL - try to get the main event flyer
    let imageUrl = '';
    const flyerImage = document.querySelector(
      '[data-testid="full-width-image"] img'
    );
    if (flyerImage) {
      imageUrl = flyerImage.getAttribute('src') || '';
    } else {
      // Fallback to old selector
      const imageElement = document.querySelector('img[src*="images"]');
      imageUrl = imageElement?.getAttribute('src') || '';
    }

    // Extract ticket URL
    const ticketElement = document.querySelector('a[href*="tickets"]');
    const ticketUrl = ticketElement?.getAttribute('href') || '';

    // Extract attendee count
    const attendeeElement = document.querySelector('[data-testid="meta-text"]');
    const attendeeCount = attendeeElement?.textContent?.trim() || '';

    // Determine if event is ticketed
    const isTicketed = !!document.querySelector('a[href="#tickets"]');

    // Extract ticket prices
    let ticketPrices = '';
    // Look for cost in the RA design - avoid using class names
    const costLabels = Array.from(document.querySelectorAll('span')).filter(
      (el) => el.textContent?.trim().toLowerCase() === 'cost'
    );

    if (costLabels.length > 0) {
      // Find the cost value near the label
      const costLabel = costLabels[0];
      const costParent =
        costLabel.closest('li') || costLabel.parentElement?.parentElement;
      if (costParent) {
        const costValueElement = costParent.querySelector(
          'span:not(:first-child)'
        );
        ticketPrices = costValueElement?.textContent?.trim() || '';
      }
    }

    if (!ticketPrices) {
      // Fallback to old selectors
      const ticketPriceElement = document.querySelector(
        '[data-testid="ticket-price"]'
      );
      if (ticketPriceElement) {
        ticketPrices = ticketPriceElement.textContent?.trim() || '';
      } else {
        // Try alternative selectors if the primary one doesn't work
        const priceElements = document.querySelectorAll(
          '.ticket-price, .price-info, [data-pw-test-id="ticket-price"]'
        );
        if (priceElements.length > 0) {
          ticketPrices = Array.from(priceElements)
            .map((el) => el.textContent?.trim())
            .filter(Boolean)
            .join(', ');
        }
      }
    }

    return {
      id: eventId,
      title,
      url,
      date: dateText,
      status: 'scraped',
      data: {
        date: dateText,
        start_time: startTime,
        end_time: endTime,
        venue,
        venue_url: fullVenueUrl,
        lineup: lineup.filter((artist) => artist.name) as {
          name: string;
          url?: string;
        }[],
        description,
        image_url: imageUrl,
        source: 'resident advisor',
        ticket_url: ticketUrl,
        attendee_count: attendeeCount,
        is_ticketed: isTicketed,
        ticket_prices: ticketPrices,
      },
    };
  } catch (error) {
    console.error('Error extracting event data:', error);
    return {
      id: '',
      title: '',
      url: window.location.href,
      date: '',
      status: 'error',
      data: {},
    };
  }
}

// Message handler for Chrome extension communication
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log(
    'Received message in ra-event.ts:',
    message,
    sender,
    sendResponse
  );
  if (message.type === 'EXTRACT_RA_EVENT_DATA') {
    const eventData = await extractRAEventData();
    console.log('EXTRACTED EVENT: ', eventData);
    sendResponse(eventData);
    return true; // Keep the message channel open for async response
  }
});
// End of Selection
