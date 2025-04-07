'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getVenues, Venue } from '@gods.work/utils';
import { FaMapMarkerAlt, FaSearch, FaTimes } from 'react-icons/fa';

interface VenueSearchProps {
  onSelect: (venue: Venue | null) => void;
  initialVenue?: Venue;
}

export const VenueSearch = ({ onSelect, initialVenue }: VenueSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(
    initialVenue || null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setIsLoading(true);
        const venuesData = await getVenues({
          limit: 1000,
        });
        setVenues(venuesData);
        setFilteredVenues(venuesData);

        // If initialVenue is provided, find and select that venue
        if (initialVenue) {
          const foundVenue = venuesData.find(
            (venue: Venue) => venue.id === initialVenue.id
          );
          if (foundVenue) {
            setSelectedVenue(foundVenue);
            setSearchTerm(foundVenue.title);
          }
        }
      } catch (err) {
        console.error('Error fetching venues:', err);
        setError('Failed to load venues. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, [initialVenue]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredVenues(venues);
    } else {
      const filtered = venues.filter(
        (venue) =>
          venue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (venue.geo &&
            venue.geo?.address
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
      setFilteredVenues(filtered);
    }
  }, [searchTerm, venues]);

  const handleVenueSelect = (venue: Venue) => {
    setSelectedVenue(venue);
    setSearchTerm('');
    setIsDropdownOpen(false);
    onSelect(venue);
  };

  const handleRemoveVenue = () => {
    setSelectedVenue(null);
    setSearchTerm('');
    onSelect(null);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputBlur = () => {
    // Delay closing the dropdown to allow for click events
    setTimeout(() => setIsDropdownOpen(false), 200);
  };

  return (
    <VenueSearchContainer>
      {selectedVenue ? (
        <SelectedVenueWrapper>
          <SelectedVenueDisplay>
            <VenueIcon>
              <FaMapMarkerAlt />
            </VenueIcon>
            <VenueDetails>
              <VenueName>{selectedVenue.title}</VenueName>
              {selectedVenue.geo && (
                <VenueAddress>{selectedVenue.geo.address}</VenueAddress>
              )}
            </VenueDetails>
            <RemoveButton onClick={handleRemoveVenue}>
              <FaTimes />
            </RemoveButton>
          </SelectedVenueDisplay>
        </SelectedVenueWrapper>
      ) : (
        <>
          <SearchInputWrapper>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search for a venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </SearchInputWrapper>

          {isLoading && <LoadingMessage>Loading venues...</LoadingMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {isDropdownOpen && filteredVenues.length > 0 && (
            <VenueDropdown>
              {filteredVenues.map((venue: Venue) => (
                <VenueItem
                  key={venue.id}
                  onClick={() => handleVenueSelect(venue)}
                  isSelected={false}
                >
                  <VenueIcon>
                    <FaMapMarkerAlt />
                  </VenueIcon>
                  <VenueDetails>
                    <VenueName>{venue.title}</VenueName>
                    {venue.geo && (
                      <VenueAddress>{venue.geo.address}</VenueAddress>
                    )}
                  </VenueDetails>
                </VenueItem>
              ))}
            </VenueDropdown>
          )}

          {isDropdownOpen && filteredVenues.length === 0 && !isLoading && (
            <NoResults>No venues found matching "{searchTerm}"</NoResults>
          )}
        </>
      )}
    </VenueSearchContainer>
  );
};

const VenueSearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const VenueDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const VenueItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  background: ${(props) =>
    props.isSelected ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const SelectedVenueWrapper = styled.div`
  width: 100%;
`;

const SelectedVenueDisplay = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
`;

const VenueIcon = styled.div`
  margin-right: 12px;
  color: #ff3366;
`;

const VenueDetails = styled.div`
  flex: 1;
`;

const VenueName = styled.div`
  font-weight: 500;
  color: #fff;
`;

const VenueAddress = styled.div`
  font-size: 0.85rem;
  color: #aaa;
  margin-top: 4px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    color: #ff3366;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const LoadingMessage = styled.div`
  padding: 12px;
  text-align: center;
  color: #aaa;
`;

const ErrorMessage = styled.div`
  padding: 12px;
  text-align: center;
  color: #ff3366;
`;

const NoResults = styled.div`
  padding: 12px;
  text-align: center;
  color: #aaa;
`;
