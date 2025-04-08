import React, { useState, useEffect } from 'react';
import { getRAEvents, createEvent, RAEventData, convertDefaultToResized } from '@gods.work/utils';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledCard = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
`;

const EventDetailsContainer = styled.div`
  padding: 20px;
`;

const EventImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 20px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  background-color: ${props => props.primary ? '#1890ff' : 'white'};
  color: ${props => props.primary ? 'white' : 'rgba(0, 0, 0, 0.65)'};
  
  &:hover {
    opacity: 0.8;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e8e8e8;
  }
  
  th {
    background-color: #fafafa;
    font-weight: 500;
  }
`;

const Tag = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => 
    props.color === 'blue' ? '#e6f7ff' : 
    props.color === 'green' ? '#f6ffed' : 
    '#f5f5f5'};
  color: ${props => 
    props.color === 'blue' ? '#1890ff' : 
    props.color === 'green' ? '#52c41a' : 
    'rgba(0, 0, 0, 0.65)'};
  border: 1px solid ${props => 
    props.color === 'blue' ? '#91d5ff' : 
    props.color === 'green' ? '#b7eb8f' : 
    '#d9d9d9'};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 8px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  background-color: ${props => props.active ? '#1890ff' : 'white'};
  color: ${props => props.active ? 'white' : 'rgba(0, 0, 0, 0.65)'};
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    border-color: #1890ff;
    color: ${props => props.active ? 'white' : '#1890ff'};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 4px;
  width: 800px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalFooter = styled.div`
  padding: 10px 16px;
  border-top: 1px solid #e8e8e8;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
  &:after {
    content: " ";
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #1890ff;
    border-color: #1890ff transparent #1890ff transparent;
    animation: spin 1.2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const RAEventsAdmin = () => {
  const [events, setEvents] = useState<RAEventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<RAEventData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const fetchEvents = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const result = await getRAEvents({ 
        limit: pageSize, 
        offset: (page - 1) * pageSize 
      });
      setEvents(result || []);
      setPagination({
        ...pagination,
        current: page,
        total: result.total || 0
      });
    } catch (error) {
      console.error('Error fetching RA events:', error);
      alert('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(pagination.current, pagination.pageSize);
  }, []);

  const handlePageChange = (page: number, pageSize: number) => {
    fetchEvents(page, pageSize);
  };

  const viewEventDetails = async (event: RAEventData) => {
    window.open(event.url, '_blank');
  };

  const importEvent = async (event: any) => {
    setImportLoading(true);
    try {
      const eventData = {
        title: event.title,
        description: event.data.description,
        start_time: `${event.date} ${event.data.start_time}`,
        end_time: event.data.end_time ? `${event.date} ${event.data.end_time}` : null,
        venue_name: event.data.venue,
        image_url: event.data.image_url,
        source: 'resident advisor',
        source_id: event.id,
        source_url: event.url,
        status: 'published'
      };
      
      const result = await createEvent(eventData);
      if (result) {
        alert('Event imported successfully');
      }
    } catch (error) {
      console.error('Error importing event:', error);
      alert('Failed to import event');
    } finally {
      setImportLoading(false);
    }
  };

  const renderTableRows = () => {
    return events.map(event => (
      <tr key={event.id}>
        <td>
          {event.data.image_url ? (
            <img 
              src={convertDefaultToResized(event.data.image_url)} 
              alt={event.title} 
              style={{ width: '100px', height: 'auto', objectFit: 'cover' }} 
            />
          ) : (
            <span>No image</span>
          )}
        </td>
        <td>{event.title}</td>
        <td>{event.date}</td>
        <td>
          <Tag color={event.status === 'scraped' ? 'blue' : event.status === 'imported' ? 'green' : 'default'}>
            {event.status}
          </Tag>
        </td>
        <td>
          <ActionButtons>
            <Button onClick={() => viewEventDetails(event)}>
              Open RA
            </Button>
          </ActionButtons>
        </td>
      </tr>
    ));
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(pagination.total / pagination.pageSize);
    const pages = [];
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= pagination.current - 2 && i <= pagination.current + 2)
      ) {
        pages.push(
          <PageButton 
            key={i} 
            active={i === pagination.current}
            onClick={() => handlePageChange(i, pagination.pageSize)}
          >
            {i}
          </PageButton>
        );
      } else if (
        i === pagination.current - 3 || 
        i === pagination.current + 3
      ) {
        pages.push(<span key={i}>...</span>);
      }
    }
    
    return (
      <Pagination>
        <PageButton 
          onClick={() => handlePageChange(pagination.current - 1, pagination.pageSize)}
          disabled={pagination.current === 1}
        >
          Previous
        </PageButton>
        {pages}
        <PageButton 
          onClick={() => handlePageChange(pagination.current + 1, pagination.pageSize)}
          disabled={pagination.current === totalPages}
        >
          Next
        </PageButton>
      </Pagination>
    );
  };

  return (
    <Container>
      <Header>
        <Title>Resident Advisor Events</Title>
        <Button primary>
          ➕ Create Event
        </Button>
      </Header>

      <StyledCard>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Flyer</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {renderTableRows()}
              </tbody>
            </Table>
            {renderPagination()}
          </>
        )}
      </StyledCard>

      {modalVisible && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h3>Event Details</h3>
              <button onClick={() => setModalVisible(false)}>✕</button>
            </ModalHeader>
            
            {selectedEvent && (
              <EventDetailsContainer>
                {selectedEvent.data.image_url && (
                  <EventImage src={selectedEvent.data.image_url} alt={selectedEvent.title} />
                )}
                <h2>{selectedEvent.title}</h2>
                <p><strong>Date:</strong> {selectedEvent.date}</p>
                <p><strong>Time:</strong> {selectedEvent.data.start_time} - {selectedEvent.data.end_time}</p>
                <p><strong>Venue:</strong> {selectedEvent.data.venue}</p>
                <p><strong>Lineup:</strong> {selectedEvent.data.lineup?.map((artist: any) => artist.name).join(', ')}</p>
                <div>
                  <h3>Description</h3>
                  <p>{selectedEvent.data.description}</p>
                </div>
              </EventDetailsContainer>
            )}
            
            <ModalFooter>
              <Button onClick={() => setModalVisible(false)}>
                Close
              </Button>
              <Button 
                primary
                onClick={() => {
                  importEvent(selectedEvent);
                  setModalVisible(false);
                }}
              >
                Import Event
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default RAEventsAdmin;
