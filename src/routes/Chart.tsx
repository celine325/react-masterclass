import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";
import ApexChart from "react-apexcharts";
import { useTheme } from "styled-components";

const ChartContainer = styled.div`
  background: ${(props) =>
    props.theme.bgColor === "#2f3640"
      ? "linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.1))"
      : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 0.05))"};
  padding: 25px;
  border-radius: 15px;
  margin: 20px 0px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
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
        <p>Loading Chart...</p>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ApexChart
        type="candlestick"
        series={[
          {
            data:
              data?.map((price) => ({
                x: new Date(price.time_close * 1000),
                y: [
                  parseFloat(price.open),
                  parseFloat(price.high),
                  parseFloat(price.low),
                  parseFloat(price.close),
                ],
              })) ?? [],
          },
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            type: "candlestick",
            height: 350,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: {
            borderColor: "rgba(255, 255, 255, 0.1)",
            strokeDashArray: 4,
          },
          yaxis: {
            show: true,
            labels: {
              style: {
                colors: theme.textColor,
              },
              formatter: (value) => `$${value.toFixed(0)}`,
            },
          },
          xaxis: {
            type: "datetime",
            labels: {
              style: {
                colors: theme.textColor,
              },
              datetimeFormatter: {
                year: "yyyy",
                month: "MMM 'yy",
                day: "dd MMM",
                hour: "HH:mm",
              },
            },
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: theme.accentColor,
                downward: "#ef4444",
              },
              wick: {
                useFillColor: true,
              },
            },
          },
          tooltip: {
            theme: "dark",
            x: {
              format: "dd MMM yyyy HH:mm",
            },
          },
        }}
      />
    </ChartContainer>
  );
}

export default Chart;
