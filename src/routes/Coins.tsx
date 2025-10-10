import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
`;

const ThemeToggle = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 30px;
  background: ${(props) =>
    props.theme.bgColor === "#2f3640" ? "#4cd137" : "#8c7ae6"};
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 3px;
  z-index: 1000;

  &::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    top: 3px;
    left: ${(props) => (props.theme.bgColor === "#2f3640" ? "3px" : "33px")};
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) =>
    props.theme.bgColor === "#2f3640" ? "white" : "#2f3640"};
  color: ${(props) =>
    props.theme.bgColor === "#2f3640" ? "#2f3640" : "white"};
  margin-bottom: 10px;

  border-radius: 15px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
}

interface CoinsProps {
  toggleTheme: () => void;
}

function Coins({ toggleTheme }: CoinsProps) {
  const { isLoading, data } = useQuery<{ data: ICoin[] }>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });

  return (
    <Container>
      <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme" />
      <Header>
        <Title>Coin</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
