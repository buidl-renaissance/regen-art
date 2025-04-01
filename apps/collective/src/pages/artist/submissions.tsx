'use client';

import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Metadata } from 'next';

interface ArtistSubmission {
  id: number;
  name: string;
  email: string;
  data: {
    instagram: string;
    bio: string;
    isAvailable: boolean;
    willingToSpeak: boolean;
    imageUrls: string[];
  };
  submitted_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-family: 'Inter', sans-serif;
  background-color: #121212;
  padding: 2rem;
  min-height: 100vh;

  .header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .submissions-container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-select {
    padding: 0.5rem;
    background-color: #1e1e1e;
    border: 1px solid #333;
    border-radius: 4px;
    color: white;
  }

  .search-input {
    padding: 0.5rem;
    background-color: #1e1e1e;
    border: 1px solid #333;
    border-radius: 4px;
    color: white;
    width: 250px;
  }

  .submission-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .submission-card {
    background-color: rgba(30, 30, 30, 0.7);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
    
    &:hover {
      transform: translateY(-5px);
    }
  }

  .submission-image {
    height: 200px;
    width: 100%;
    position: relative;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background-color: #2a2a2a;
      color: #666;
    }
  }

  .submission-content {
    padding: 1.5rem;
  }

  .submission-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .submission-name {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  .submission-date {
    font-size: 0.85rem;
    color: #999;
  }

  .submission-instagram {
    color: #FF3366;
    margin-bottom: 1rem;
    display: block;
  }

  .submission-bio {
    margin-bottom: 1rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #ccc;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .submission-tags {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    background-color: #333;
    
    &.available {
      background-color: #2d4a22;
    }
    
    &.speaker {
      background-color: #4a3922;
    }
  }

  .submission-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .status-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: 600;
    
    &.pending {
      background-color: #3d3d3d;
      color: #f0f0f0;
    }
    
    &.approved {
      background-color: #2d4a22;
      color: #a3e635;
    }
    
    &.rejected {
      background-color: #4a2222;
      color: #f87171;
    }
  }

  .view-button {
    padding: 0.5rem 1rem;
    background-color: #FF3366;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #e62e5c;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    gap: 0.5rem;
  }

  .page-button {
    padding: 0.5rem 1rem;
    background-color: #1e1e1e;
    border: 1px solid #333;
    color: white;
    cursor: pointer;
    
    &.active {
      background-color: #FF3366;
      border-color: #FF3366;
    }
    
    &:hover:not(.active) {
      background-color: #333;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .empty-state {
    text-align: center;
    padding: 3rem;
    background-color: rgba(30, 30, 30, 0.7);
    border-radius: 8px;
  }
`;

export const metadata: Metadata = {
  title: 'Artist Submissions | Art Night Detroit',
  description: 'View and manage artist submissions for Art Night Detroit',
};

export async function getServerSideProps() {
  return {
    props: {
      metadata,
    },
  };
}

const ArtistSubmissionsPage: FC = () => {
  const [submissions, setSubmissions] = useState<ArtistSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const submissionsPerPage = 12;

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/artist/submissions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        
        const data = await response.json();
        setSubmissions(data.submissions);
      } catch (err) {
        console.error('Error fetching submissions:', err);
        setError('Failed to load artist submissions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubmissions();
  }, []);

  // Filter submissions based on status and search term
  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.data.instagram.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Paginate submissions
  const indexOfLastSubmission = currentPage * submissionsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
  const currentSubmissions = filteredSubmissions.slice(indexOfFirstSubmission, indexOfLastSubmission);
  const totalPages = Math.ceil(filteredSubmissions.length / submissionsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <StyledPage>
        <div className="header">
          <h1>Artist Submissions</h1>
        </div>
        <div className="submissions-container">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            Loading submissions...
          </div>
        </div>
      </StyledPage>
    );
  }

  if (error) {
    return (
      <StyledPage>
        <div className="header">
          <h1>Artist Submissions</h1>
        </div>
        <div className="submissions-container">
          <div style={{ textAlign: 'center', padding: '3rem', color: '#f87171' }}>
            {error}
          </div>
        </div>
      </StyledPage>
    );
  }

  return (
    <StyledPage>
      <div className="header">
        <h1>Artist Submissions</h1>
      </div>
      
      <div className="submissions-container">
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select 
              id="status-filter" 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <input
            type="text"
            placeholder="Search by name, email, or Instagram"
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        
        {filteredSubmissions.length === 0 ? (
          <div className="empty-state">
            <h3>No submissions found</h3>
            <p>Try adjusting your filters or check back later for new submissions.</p>
          </div>
        ) : (
          <>
            <div className="submission-list">
              {currentSubmissions.map((submission) => (
                <div key={submission.id} className="submission-card">
                  <div className="submission-image">
                    {submission.data.imageUrls && submission.data.imageUrls.length > 0 ? (
                      <img src={submission.data.imageUrls[0]} alt={`Artwork by ${submission.name}`} />
                    ) : (
                      <div className="no-image">No images submitted</div>
                    )}
                  </div>
                  
                  <div className="submission-content">
                    <div className="submission-header">
                      <h3 className="submission-name">{submission.name}</h3>
                      <span className="submission-date">{formatDate(submission.submitted_at)}</span>
                    </div>
                    
                    <a href={`https://instagram.com/${submission.data.instagram.replace('@', '')}`} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="submission-instagram">
                      {submission.data.instagram}
                    </a>
                    
                    <p className="submission-bio">{submission.data.bio}</p>
                    
                    <div className="submission-tags">
                      {submission.data.isAvailable && (
                        <span className="tag available">Available for Shows</span>
                      )}
                      {submission.data.willingToSpeak && (
                        <span className="tag speaker">Willing to Speak</span>
                      )}
                    </div>
                    
                    <div className="submission-actions">
                      <span className={`status-badge ${submission.status}`}>
                        {submission.status}
                      </span>
                      
                      <Link href={`/artist/submission/${submission.id}`}>
                        <button className="view-button">View Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="page-button"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`page-button ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  className="page-button"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </StyledPage>
  );
};

export default ArtistSubmissionsPage;
