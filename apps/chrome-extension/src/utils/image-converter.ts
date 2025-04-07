/**
 * Converts a WebP image to JPG format
 * @param webpUrl URL of the WebP image to convert
 * @returns Promise that resolves to a data URL of the JPG image
 */
export const convertWebpToJpg = async (webpUrl: string): Promise<string> => {
  try {
    // Fetch the WebP image
    const response = await fetch(webpUrl);
    const blob = await response.blob();
    
    // Create an image element to load the WebP
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // Create a canvas to draw the image
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on the canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        // Convert to JPG format
        const jpgDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        resolve(jpgDataUrl);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      // Load the WebP image
      img.src = URL.createObjectURL(blob);
    });
  } catch (error) {
    console.error('Error converting WebP to JPG:', error);
    throw error;
  }
};

/**
 * Checks if a URL points to a WebP image
 * @param url URL to check
 * @returns Boolean indicating if the URL is for a WebP image
 */
export const isWebpImage = (url: string): boolean => {
  return url.toLowerCase().endsWith('.webp') || url.toLowerCase().includes('format=webp');
};
