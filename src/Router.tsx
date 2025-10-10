import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface RouterProps {
  toggleTheme: () => void;
}

function Router({ toggleTheme }: RouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins toggleTheme={toggleTheme} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
