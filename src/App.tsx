import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { addImagesToGames } from "./utils/getGames";
import { apiConfig } from "./utils/apiConfig";
import List from "./pages/List";
import GameComp from "./pages/GameComp";
import { Game } from "./types";

function App() {
  const [games, setGames] = React.useState<(Game | null)[]>([]);
  React.useEffect(() => {
    axios
      .get(
        `${apiConfig.baseURI}/spaces/${apiConfig.spaceId}/environments/${apiConfig.environmentId}/entries?access_token=${apiConfig.accessToken}`
      )
      .then((resp) => {
        setGames(addImagesToGames(resp));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/">
              <List games={games} />
            </Route>
            <Route path="/game/:name">
              <GameComp games={games} />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
