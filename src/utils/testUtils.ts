import { GameWithoutImage, Image, Resp } from "../pages/List/List";

export const mockedGames: GameWithoutImage[] = [
  {
    fields: {
      name: "Star Wars",
      steps: ["one", "two", "three"],
      thumbnail: {
        sys: {
          id: "Star Wars",
        },
      },
    },
  },
  {
    fields: {
      name: "Spirit Island",
      steps: ["uno", "dos", "tres"],
      thumbnail: {
        sys: {
          id: "Spirit Island",
        },
      },
    },
  },
];
export const mockedImages: Image[] = [
  {
    fields: {
      file: {
        url: "some url",
      },
    },
    sys: {
      id: "Star Wars",
    },
  },
  {
    fields: {
      file: {
        url: "other url",
      },
    },
    sys: {
      id: "Spirit Island",
    },
  },
];
export const mockedResponse: Resp = {
  data: {
    items: mockedGames,
    includes: { Asset: mockedImages },
  },
};
