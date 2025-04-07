import { useEffect, useState } from 'react';
import './App.css';
import { createArtwork } from './components/dpop';
import { Artwork } from './components/interfaces';

// import { ArtistSearch, Artist } from './components/ArtistSearch';

interface ArtworkData {
  title: string;
  artist: {
    name: string;
    url: string;
  };
  medium: string;
  dimensions: string;
  price: string;
  description: string;
  imageUrl: string;
  source: string;
}

function App() {
  const [artworkData, setArtworkData] = useState<ArtworkData | null>(null);

  // const handleArtistSelect = (artist: Artist) => {
  //   console.log('Selected artist:', artist);
  // };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      (message: { type: string; data: ArtworkData }) => {
        if (message.type === 'ARTWORK_DATA') {
          console.log('Received artwork data:', message.data);
          setArtworkData(message.data);
        }
      }
    );
  }, []);

  const handleExtractArtworkData = () => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs: chrome.tabs.Tab[]) {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { type: 'EXTRACT_ARTWORK_DATA' },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error('Error:', chrome.runtime.lastError.message);
                // Handle the error - maybe show a message to the user
                alert(
                  'Could not extract artwork data. Make sure you are on a supported page.'
                );
                return;
              }

              setArtworkData(response);
            }
          );
        }
      }
    );
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Community Collector</h1>
        <p>Save and share valuable content with your community</p>
      </header>

      {/* <div className="artist-search-container">
        <h3>Search Artists</h3>
        <ArtistSearch onSelect={handleArtistSelect} />
      </div> */}

      {artworkData && (
        <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>Artwork Details</h3>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '20px',
          }}>
            {artworkData.imageUrl && (
              <div style={{ flex: 1 }}>
                <img 
                  src={artworkData.imageUrl} 
                  alt={artworkData.title} 
                  style={{ maxWidth: '100%', borderRadius: '4px' }}
                />
              </div>
            )}
            <div style={{ flex: 1 }}>
              <h4>{artworkData.title}</h4>
              <p className="artist-name">
                By:{' '}
                <a
                  href={artworkData.artist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {artworkData.artist.name}
                </a>
              </p>
              {artworkData.medium && (
                <p>
                  <strong>Medium:</strong> {artworkData.medium}
                </p>
              )}
              {artworkData.dimensions && (
                <p>
                  <strong>Dimensions:</strong> {artworkData.dimensions}
                </p>
              )}
              {artworkData.price && (
                <p>
                  <strong>Price:</strong> {artworkData.price}
                </p>
              )}
              {artworkData.description && (
                <div style={{ marginTop: '10px' }}>
                  <strong>Description:</strong>
                  <p>{artworkData.description}</p>
                </div>
              )}
              <p className="source-link">
                <strong>Source:</strong>{' '}
                <a
                  href={artworkData.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Original
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <button 
          onClick={handleExtractArtworkData}
          style={{ 
            padding: '10px 15px', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            backgroundColor: '#4285f4',
            color: 'white'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3367d6'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4285f4'}
        >
          Extract Artwork Data
        </button>

        {artworkData && (
          <button
            onClick={async () => {
              // TODO: Implement save functionality
              console.log('Saving artwork:', artworkData);
              const artwork: Artwork = await createArtwork({
                title: artworkData.title,
                description: artworkData.description,
                artist_id: 4,
                data: {
                  medium: artworkData.medium,
                  dimensions: artworkData.dimensions,
                  price: artworkData.price,
                  image: artworkData.imageUrl,
                  source: artworkData.source,
                }
              });
              console.log('Artwork created:', artwork);
              alert('Artwork saved successfully: ' + artwork.title);
            }}
            style={{ 
              padding: '10px 15px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              backgroundColor: '#34a853',
              color: 'white'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2e8b57'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#34a853'}
          >
            Save Artwork
          </button>
        )}
      </div>

      <footer style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8rem', color: '#666' }}>
        <p>Community Collector Extension v1.0</p>
      </footer>
    </div>
  );
}

export default App;
