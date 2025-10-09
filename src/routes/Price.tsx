import styled from "styled-components";

const PriceContainer = styled.div`
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.6),
    rgba(255, 255, 255, 0.1)
  );
  padding: 25px;
  border-radius: 15px;
  margin: 20px 0px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const PriceTitle = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 20px;
`;

function Price() {
  return (
    <PriceContainer>
      <PriceTitle>Price Information</PriceTitle>
      <p style={{ textAlign: "center", color: "rgba(255, 255, 255, 0.7)" }}>
        Detailed price data and analytics coming soon...
      </p>
    </PriceContainer>
  );
}

export default Price;
