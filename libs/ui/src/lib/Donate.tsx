import styled from 'styled-components';

const StyledDonate = styled.div`
  text-align: center;
  margin-top: 2rem;
  .donate-text {
    font-weight: bold;
  }
  .donate-address {
    font-size: 0.8rem;
  }
`;

export const Donate = () => {
  return (
    <StyledDonate className="donate">
      <div className="donate-text">DONATE</div>
      <div className="donate-address">
        0x84Da1546238937296355A0F3217Ee4163E2ECC42
      </div>
    </StyledDonate>
  );
};
