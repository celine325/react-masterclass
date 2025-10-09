export function fetchCoins() {
  return fetch("https://api.coinlore.net/api/tickers/").then((response) =>
    response.json()
  );
}
