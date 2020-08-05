import React from "react";
import { render, act } from "@testing-library/react";
import axios from "axios";
import App from "./App";
import { mockedResponse } from "./utils/testUtils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedResponse));

test("App calls api", async () => {
  // Structure below (await, act, async) is needed to silent the 'act' error
  await act(async () => {
    render(<App />);
  });

  expect(mockedAxios.get).toHaveBeenCalledTimes(1);
});
