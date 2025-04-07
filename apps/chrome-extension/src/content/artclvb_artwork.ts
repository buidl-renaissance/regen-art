// import { createArtwork } from '@gods.work/utils';

console.log('Content script loaded');
// const content = document.querySelector('body');
// console.log(content);

console.log('URL: ', document.location.href);

if (document.location.href.match('https://app.artclvb.xyz/artist/')) {
  console.log('Artclvb artist page');
  const artistName = document.querySelector(
    'h1.text-2xl.font-bold.text-gray-900.dark\\:text-white'
  );
  console.log(artistName);
}

if (document.location.href.match('https://app.artclvb.xyz/artwork/')) {
  console.log('Artclvb artwork page');
  const artworkName = document.querySelector(
    'h1.text-2xl.font-bold.text-gray-900.dark\\:text-white'
  );
  console.log(artworkName);

  //   setTimeout(() => {
  //     extractArtworkData();
  //   }, 1000);
}

const cleanTitle = (title: string) => {
  // Remove year from title if present
  // Common patterns: "Title (2023)" or "Title, 2023"
  let cleanTitle = title;
  const yearPattern1 = /\s*\(\d{4}\)\s*$/;  // Pattern for "Title (2023)"
  const yearPattern2 = /\s*,\s*\d{4}\s*$/;  // Pattern for "Title, 2023"

  if (yearPattern1.test(cleanTitle)) {
    cleanTitle = cleanTitle.replace(yearPattern1, '');
  } else if (yearPattern2.test(cleanTitle)) {
    cleanTitle = cleanTitle.replace(yearPattern2, '');
  }

  return cleanTitle;
};

// Function to extract artwork data from ArtClvb pages
function extractArtworkData() {
  // Check if we're on an artwork page
  if (document.location.href.match('https://app.artclvb.xyz/artwork/')) {
    try {
      // Extract artwork details using more reliable selectors
      const artworkTitle =
      cleanTitle(document.querySelector('h1')?.textContent?.trim() || '');

      // Extract artist name and link - typically the first link after the title
      const artistLinks = Array.from(document.querySelectorAll('a')).filter(
        (link) => link.href.includes('/artist/')
      );
      const artistElement = artistLinks[0];
      const artistName = artistElement?.textContent?.trim() || '';
      const artistUrl = artistElement?.getAttribute('href') || '';

      // Extract medium and dimensions - typically found in paragraph elements
      // Look for text patterns instead of relying on class names
      const paragraphs = Array.from(document.querySelectorAll('p'));
      let medium = '';
      let dimensions = '';
      let price = '';
      let description = '';

      // Find paragraphs with relevant content based on text patterns
      paragraphs.forEach((p) => {
        const text = p.textContent?.trim() || '';
        if (text.includes(' x ') && text.length < 20) {
          dimensions = text;
        } else if (
          (text.includes('$') ||
            text.includes('USD') ||
            text.includes('ETH')) &&
          text.length < 20
        ) {
          price = text;
        } else if (text.length > 100) {
          // Longer paragraphs are likely descriptions
          description = text;
        } else if (
          text.includes('oil') ||
          text.includes('acrylic') ||
          text.includes('canvas') ||
          text.includes('paper') ||
          text.includes('ink') ||
          text.includes('print')
        ) {
          medium = text;
        }
      });

      // Extract image URL - look for the main image on the page
      const images = Array.from(document.querySelectorAll('img')).filter(
        (img) => img.width > 200 && img.height > 200
      );
      const imageUrl = images[0]?.getAttribute('src') || '';

      // Create artwork data object
      const artworkData = {
        title: artworkTitle,
        artist: {
          name: artistName,
          url: artistUrl,
        },
        medium,
        dimensions,
        price,
        description,
        imageUrl,
        source: document.location.href,
      };

      console.log('Extracted artwork data:', artworkData);

      return artworkData;
    } catch (error) {
      console.error('Error extracting artwork data:', error);
    }
  }

  return null;
}

chrome.runtime.onMessage.addListener(
  (message: any, sender: any, sendResponse: any) => {
    console.log('Received message:', message, sender, sendResponse);
    if (message.type === 'EXTRACT_ARTWORK_DATA') {
      const artworkData = extractArtworkData();
      sendResponse(artworkData);
    }
  }
);
