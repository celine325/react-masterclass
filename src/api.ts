const BASE_URL = "https://api.coinlore.net/api";

export function fetchCoins() {
  return fetch(`${BASE_URL}/tickers/`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/ticker/?id=${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinHistory(coinId: string) {
  // First, get the coin info to get the symbol and name
  const coinInfo = await fetch(`${BASE_URL}/ticker/?id=${coinId}`).then(
    (response) => response.json()
  );

  const symbol = coinInfo[0]?.symbol.toLowerCase();
  const name = coinInfo[0]?.nameid || coinInfo[0]?.name.toLowerCase();

  // Format: symbol-name (e.g., btc-bitcoin)
  const formattedCoinId = `${symbol}-${name}`;

  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${formattedCoinId}`
  ).then((response) => response.json());
}
