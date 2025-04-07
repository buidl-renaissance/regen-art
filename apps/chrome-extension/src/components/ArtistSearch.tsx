
'use client';

import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getArtists } from './dpop';
import { Artist } from './interfaces';

export type { Artist };

interface ArtistSearchProps {
  onSelect: (artist: Artist) => void;
  placeholder?: string;
  initialValue?: Artist | null;
}

export function ArtistSearch({ 
  onSelect, 
  placeholder = 'Search for an artist...', 
  initialValue = null 
}: ArtistSearchProps) {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [, setSelectedArtist] = useState<Artist | null>(initialValue);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch artists on component mount
  useEffect(() => {
    const fetchArtists = async () => {
      setIsLoading(true);
      try {
        const data = await getArtists();
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Filter artists based on search query
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredArtists([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    // First prioritize artists where the query matches the start of their name
    const startsWithMatches = artists.filter(artist => 
      artist.name.toLowerCase().startsWith(lowerQuery) ||
      artist.name.toLowerCase().split(' ').some(word => word.startsWith(lowerQuery))
    );
    
    // Then include artists where the query appears anywhere in their name
    const containsMatches = artists.filter(artist => 
      !startsWithMatches.includes(artist) && 
      artist.name.toLowerCase().includes(lowerQuery)
    );
    
    // Combine the results, prioritizing the startsWith matches
    setFilteredArtists([...startsWithMatches, ...containsMatches]);
  }, [query, artists]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(true);
  };

  const handleArtistSelect = (artist: Artist) => {
    setSelectedArtist(artist);
    setQuery(artist.name);
    setShowResults(false);
    onSelect(artist);
  };

  return (
    <SearchContainer ref={searchRef}>
      <SearchInput
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowResults(true)}
        placeholder={placeholder}
      />
      
      {showResults && (
        <ResultsContainer>
          {isLoading ? (
            <LoadingIndicator>Loading artists...</LoadingIndicator>
          ) : filteredArtists.length > 0 ? (
            filteredArtists.map(artist => (
              <ResultItem 
                key={artist.id} 
                onClick={() => handleArtistSelect(artist)}
              >
                <ArtistName>{artist.name}</ArtistName>
                {artist.bio && <ArtistBio>{artist.bio.substring(0, 60)}...</ArtistBio>}
              </ResultItem>
            ))
          ) : query.trim() !== '' ? (
            <NoResults>No artists found</NoResults>
          ) : null}
        </ResultsContainer>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #96885f;
    box-shadow: 0 0 0 2px rgba(150, 136, 95, 0.2);
  }
`;

const ResultsContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999; /* Higher z-index to ensure visibility in modals */
  margin-top: 2px;
  
  /* Dynamically position above or below based on available space */
  ${props => {
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
    const elementRect = props.ref && typeof props.ref === 'object' && props.ref.current ? 
      props.ref.current.getBoundingClientRect() : null;
    const elementPosition = elementRect ? elementRect.top : 0;
    const position = elementPosition > viewportHeight / 2 ? 'bottom: 100%;' : 'top: 100%;';
    const borderRadius = elementPosition > viewportHeight / 2 
      ? '4px 4px 0 0' 
      : '0 0 4px 4px';
    
    return `
      ${position}
      border-radius: ${borderRadius};
      margin-bottom: ${elementPosition > viewportHeight / 2 ? '2px' : '0'};
      margin-top: ${elementPosition > viewportHeight / 2 ? '0' : '2px'};
    `;
  }}
`;

const ResultItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(150, 136, 95, 0.1);
  }
`;

const ArtistName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const ArtistBio = styled.div`
  font-size: 0.85rem;
  color: #666;
`;

const NoResults = styled.div`
  padding: 15px;
  text-align: center;
  color: #666;
`;

const LoadingIndicator = styled.div`
  padding: 10px;
  text-align: center;
  color: #666;
  font-style: italic;
`;
