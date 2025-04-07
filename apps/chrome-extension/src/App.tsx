import './App.css';
import ArtworkExtractor from './components/ArtworkExtractor';
import RAEventExtractor from './components/RAEventExtractor';
// import { ArtistSearch, Artist } from './components/ArtistSearch';

function App() {

  // const handleArtistSelect = (artist: Artist) => {
  //   console.log('Selected artist:', artist);
  // };
  return (
    <div style={{ width: '300px', height: '500px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Community Collector</h1>
        <p>Save and share valuable content with your community</p>
      </header>

      {/* <div className="artist-search-container">
        <h3>Search Artists</h3>
        <ArtistSearch onSelect={handleArtistSelect} />
      </div> */}

      <ArtworkExtractor />
      <RAEventExtractor />

      <footer style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8rem', color: '#666' }}>
        <p>Community Collector Extension v1.0</p>
      </footer>
    </div>
  );
}

export default App;
