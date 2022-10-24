import styled from "styled-components";

export const BulletDiv = styled.div`
  border: 1px solid #0275d8;
  background-color: #0275d8;
  color: white;
  border-radius: 5px;
  padding: 3px 5px 3px 5px;
  margin-right: 5px;
  max-height: 12px;
`;

export const MarketFlexDiv = styled.div`
  display: flex;
  @media (max-width: 950px) {
    margin: 0 10px 10px 0;
  }
  margin-bottom: 5px;
`;

export const MarketInfoDiv = styled.div`
  margin-right: 5px;
  color: ${({ theme }) => theme.text};
`;