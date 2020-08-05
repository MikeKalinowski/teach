import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { addImagesToGames } from "./utils/getGames";
import { apiConfig } from "./utils/apiConfig";
import { Game } from "./types";

import List from "./pages/List";
import GameComp from "./pages/GameComp";

const useStyles = makeStyles(() => ({
  wrapper: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
  },
}));

function App() {
  const classes = useStyles();
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
    <div className={classes.wrapper}>
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
    </div>
  );
}

export default App;
