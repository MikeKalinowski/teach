import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import List from "./List";
import { mockedResponse } from "../../utils/testUtils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedResponse));

test("renders List of games", async () => {
  const { getByText } = render(<List />);

  expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  await waitFor(() => {
    getByText("Star Wars");
  });
  const gameStarWars = screen.getByText("Star Wars");
  expect(gameStarWars).toBeInTheDocument();
  const gameSpiritIsland = screen.getByText("Spirit Island");
  expect(gameSpiritIsland).toBeInTheDocument();
  const gameCatan = screen.queryByText("Catan");
  expect(gameCatan).toBeNull();
});
