const BASE_URL = "https://api.coinlore.net/api";

export function fetchCoins() {
  return fetch(`${BASE_URL}/tickers/`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/ticker/?id=${coinId}`).then((response) =>
    response.json()
  );
}
