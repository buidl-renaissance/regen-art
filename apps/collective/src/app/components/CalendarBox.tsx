import styled from 'styled-components';

export const CalendarBox = ({ date }: { date: string }) => {
  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'short' });

  return (
    <CalendarIcon>
      <CalendarMonth>{month}</CalendarMonth>
      <CalendarDay>{day}</CalendarDay>
    </CalendarIcon>
  );
};

const CalendarIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  width: 50px;
  height: 56px;
  margin-right: 1rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CalendarMonth = styled.div`
  background: rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  padding: 4px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
`;

const CalendarDay = styled.div`
  background: rgba(0, 0, 0, 0.1);
  color: #fff;
  font-size: 1.5rem;
  line-height: 1rem;
  font-weight: 700;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
