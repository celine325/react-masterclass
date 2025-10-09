import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";
import ApexChart from "react-apexcharts";
import { useTheme } from "styled-components";

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
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

interface ChartProps {
  coinId: string;
}

interface IHistorical {
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
  const theme = useTheme();
  const { isLoading, data } = useQuery<IHistorical[]>({
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
      <ChartTitle>Price Chart</ChartTitle>
      <ApexChart
        type="line"
        series={[
          {
            name: "Price",
            data: data?.map((price) => parseFloat(price.close)) ?? [],
          },
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            height: 300,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: {
            show: false,
          },
          stroke: {
            curve: "smooth",
            width: 3,
            colors: [theme.accentColor],
          },
          yaxis: {
            show: false,
          },
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
            type: "datetime",
            categories: data?.map((price) => price.time_close * 1000),
          },
          fill: {
            type: "gradient",
            gradient: {
              gradientToColors: [theme.accentColor],
              stops: [0, 100],
            },
          },
          colors: [theme.accentColor],
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(2)}`,
            },
            theme: "dark",
          },
        }}
      />
    </ChartContainer>
  );
}

export default Chart;
