import { useState } from 'react'
import './App.css'

// import { ArtistSearch, Artist } from './components/ArtistSearch'
import { ArtistSearch } from '@gods.work/ui';
import { Artist } from '@gods.work/utils';

function App() {
  const [url, setUrl] = useState('')
  const [collecting, setCollecting] = useState(false)

  const handleCollect = () => {
    setCollecting(true)
    // Simulate collection process
    setTimeout(() => {
      setCollecting(false)
      alert('Content collected successfully!')
    }, 1500)
  }

  const handleArtistSelect = (artist: Artist) => {
    console.log('Selected artist:', artist)
  }

  return (
    <div className="container">
      <header>
        <h1>Community Collector</h1>
        <p>Save and share valuable content with your community</p>
      </header>
      
      <div className="input-group">
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="Enter URL or paste content"
          disabled={collecting}
        />
      </div>
      
      <div className="actions">
        <button 
          onClick={handleCollect} 
          disabled={!url.trim() || collecting}
          className={collecting ? 'collecting' : ''}
        >
          {collecting ? 'Collecting...' : 'Collect'}
        </button>
      </div>
      
      <div className="artist-search-container">
        <h3>Search Artists</h3>
        <ArtistSearch onSelect={handleArtistSelect} />
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>Save</h3>
          <p>Collect articles, videos, and resources</p>
        </div>
        <div className="feature">
          <h3>Organize</h3>
          <p>Categorize content for easy access</p>
        </div>
        <div className="feature">
          <h3>Share</h3>
          <p>Contribute to community knowledge</p>
        </div>
      </div>
      
      <footer>
        <p>Community Collector Extension v1.0</p>
      </footer>
    </div>
  )
}

export default App
