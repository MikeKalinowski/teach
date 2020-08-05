import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { mockedGames } from "../../utils/testUtils";
import List from "./List";

test("renders List of games", async () => {
  const history = createMemoryHistory();
  const { getByText, queryByText } = render(
    <Router history={history}>
      <List games={mockedGames} />
    </Router>
  );

  const gameStarWars = getByText("Star Wars");
  expect(gameStarWars).toBeInTheDocument();
  const gameSpiritIsland = getByText("Spirit Island");
  expect(gameSpiritIsland).toBeInTheDocument();
  const gameCatan = queryByText("Catan");
  expect(gameCatan).toBeNull();
});
