'use client';

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import styled from 'styled-components';

interface SearchProps<T> {
  items: T[];
  onSelect: (item: T) => void;
  onSearch: (query: string) => void;
  getItemLabel: (item: T) => string;
  placeholder?: string;
  loadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  noResultsMessage?: string;
}

export function Search<T>({
  items,
  onSelect,
  onSearch,
  getItemLabel,
  placeholder = 'Search...',
  loadMore,
  hasMore = false,
  loading = false,
  noResultsMessage = 'No results found'
}: SearchProps<T>) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
    setIsOpen(true);
  };

  const handleSelect = (item: T) => {
    onSelect(item);
    setIsOpen(false);
    setQuery(getItemLabel(item));
  };

  const handleScroll = () => {
    if (!listRef.current || !loadMore || !hasMore || loading) return;
    
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      loadMore();
    }
  };

  return (
    <SearchContainer ref={searchRef}>
      <SearchInput
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
      />
      
      {isOpen && (
        <ResultsList ref={listRef} onScroll={handleScroll}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <ResultItem 
                key={index} 
                onClick={() => handleSelect(item)}
              >
                {getItemLabel(item)}
              </ResultItem>
            ))
          ) : (
            <NoResults>{noResultsMessage}</NoResults>
          )}
          
          {loading && <LoadingIndicator>Loading...</LoadingIndicator>}
          
          {hasMore && !loading && (
            <LoadMoreButton onClick={loadMore}>
              Load more
            </LoadMoreButton>
          )}
        </ResultsList>
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
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  
  &:focus {
    border-color: #96885f;
    box-shadow: 0 0 0 2px rgba(150, 136, 95, 0.2);
  }
`;

const ResultsList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 2px;
`;

const ResultItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(150, 136, 95, 0.1);
  }
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

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #f5f5f5;
  border: none;
  border-top: 1px solid #ddd;
  cursor: pointer;
  color: #555;
  font-weight: 500;
  
  &:hover {
    background-color: #eee;
  }
`;
