import styled from "styled-components";

interface InfoData {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

interface PriceProps {
  info?: InfoData;
}

const PriceInfo = styled.div`
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.6),
    rgba(255, 255, 255, 0.1)
  );
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  span:first-child {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.5px;
  }

  span:last-child {
    font-weight: 700;
    font-size: 14px;
    color: ${(props) => props.theme.accentColor};
  }
`;

const StatTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 12px;
`;

const StatTab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.6),
    rgba(255, 255, 255, 0.1)
  );
  padding: 12px 0px;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

function Price({ info }: PriceProps) {
  return (
    <>
      <PriceInfo>
        <PriceItem>
          <span>Market Cap:</span>
          <span>${info?.market_cap_usd}</span>
        </PriceItem>
        <PriceItem>
          <span>24h Volume:</span>
          <span>${info?.volume24?.toLocaleString()}</span>
        </PriceItem>
        <PriceItem>
          <span>Circulating Supply:</span>
          <span>{info?.csupply}</span>
        </PriceItem>
        <PriceItem>
          <span>Total Supply:</span>
          <span>{info?.tsupply}</span>
        </PriceItem>
        <PriceItem>
          <span>Max Supply:</span>
          <span>{info?.msupply}</span>
        </PriceItem>
      </PriceInfo>

      <StatTabs>
        <StatTab>1h: {info?.percent_change_1h}%</StatTab>
        <StatTab>24h: {info?.percent_change_24h}%</StatTab>
        <StatTab>7d: {info?.percent_change_7d}%</StatTab>
        <StatTab>Price in BTC: {info?.price_btc}</StatTab>
      </StatTabs>
    </>
  );
}

export default Price;
