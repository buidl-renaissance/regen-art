import './App.css';
import ArtworkExtractor from './components/ArtworkExtractor';
import RAEventsExtractor from './components/RAEventsExtractor';
import RAEventExtractor from './components/RAEventExtractor';
// import { ArtistSearch, Artist } from './components/ArtistSearch';

function App() {

  // const handleArtistSelect = (artist: Artist) => {
  //   console.log('Selected artist:', artist);
  // };
  return (
    <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        <h1>Community Collector</h1>
        <p>Save and share valuable content with your community</p>
      </header>

      <ArtworkExtractor />
      <RAEventExtractor />
      <RAEventsExtractor />

    </div>
  );
}

export default App;
