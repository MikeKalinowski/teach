import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import GameComp from "./GameComp";
import { mockedGames } from "../../utils/testUtils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ name: "Star.Wars" }),
}));

test("Renders Game", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <GameComp games={mockedGames} />
    </Router>
  );
  const title = getByText("Star Wars"); // = game.fields.name
  expect(title).toBeInTheDocument();
  const stepOne = getByText("1. one"); // = game.fields.name
  expect(stepOne).toBeInTheDocument();
  const stepTwo = getByText("2. two"); // = game.fields.name
  expect(stepTwo).toBeInTheDocument();
});
