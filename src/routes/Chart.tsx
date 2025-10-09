import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";

const ChartContainer = styled.div`
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

const ChartTitle = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 20px;
`;

const DataList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DataItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  font-size: 12px;
`;

interface ChartProps {
  coinId: string;
}

interface OHLCVData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<OHLCVData[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });

  if (isLoading) {
    return (
      <ChartContainer>
        <ChartTitle>Loading chart data...</ChartTitle>
      </ChartContainer>
    );
  }

  if (!data || data.length === 0) {
    return (
      <ChartContainer>
        <ChartTitle>Chart</ChartTitle>
        <p style={{ textAlign: "center", color: "rgba(255, 255, 255, 0.7)" }}>
          No historical data available for this coin.
        </p>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartTitle>Price History (OHLCV)</ChartTitle>
      <DataList>
        {data.slice(0, 10).map((item, index) => (
          <DataItem key={index}>
            <span>{new Date(item.time_open * 1000).toLocaleDateString()}</span>
            <span>
              O: ${parseFloat(item.open).toFixed(2)} | H: $
              {parseFloat(item.high).toFixed(2)} | L: $
              {parseFloat(item.low).toFixed(2)} | C: $
              {parseFloat(item.close).toFixed(2)}
            </span>
          </DataItem>
        ))}
      </DataList>
    </ChartContainer>
  );
}

export default Chart;
