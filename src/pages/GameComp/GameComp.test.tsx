import React from "react";
import { render } from "@testing-library/react";
import GameComp from "./GameComp";
import { mockedGames } from "../../utils/testUtils";

test("Renders Game", () => {
  const { getByText } = render(<GameComp games={mockedGames} />);
  const title = getByText("Star Wars"); // = game.fields.name
  expect(title).toBeInTheDocument();
});
