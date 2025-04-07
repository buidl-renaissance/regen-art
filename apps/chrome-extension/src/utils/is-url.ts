/**
 * Checks if a string is a valid URL
 * @param str String to check
 * @returns Boolean indicating if the string is a valid URL
 */
export const isValidUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const getCurrentPageUrl = async () => {
  // Check if we're in a chrome extension context
  if (window.location.href.startsWith('chrome-extension://')) {
    // For chrome extension pages, we need to get the active tab URL
    const url = await new Promise<string>((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
        if (tabs[0]?.url) {
          resolve(tabs[0].url);
        } else {
          resolve(window.location.href);
        }
      });
    });
    return url;
  }
  
  // For regular web pages
  return window.location.href;
};

/**
 * Checks if the current page is a Resident Advisor event page
 * @returns Boolean indicating if the current page is a RA event page
 */
export const isRAEventPage = (url: string): boolean => {
  return url.includes('ra.co/events/') && 
         !url.endsWith('/events/') &&
         !url.includes('/events/us/') &&
         !url.includes('/events/uk/');
};

/**
 * Checks if the current page is a Resident Advisor events listing page
 * @returns Boolean indicating if the current page is a RA events listing page
 */
export const isRAEventsListingPage = (url: string): boolean => {
  return url.includes('ra.co/events/us');
};

/**
 * Checks if the current page is an Artclvb artwork page
 * @returns Boolean indicating if the current page is an Artclvb artwork page
 */
export const isArtclvbArtworkPage = (url: string): boolean => {
  return url.includes('app.artclvb.xyz/artwork/');
};

/**
 * Checks if the current page is an Artclvb artist page
 * @returns Boolean indicating if the current page is an Artclvb artist page
 */
export const isArtclvbArtistPage = (url: string): boolean => {
  return url.includes('app.artclvb.xyz/artist/');
};
