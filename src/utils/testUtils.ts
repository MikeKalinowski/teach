import { GameWithoutImage, Image, Resp } from "../types";

export const mockedGamesWithoutImages: GameWithoutImage[] = [
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
    items: mockedGamesWithoutImages,
    includes: { Asset: mockedImages },
  },
};

export const mockedGames = mockedGamesWithoutImages.map((game) => {
  return {
    ...game,
    fields: {
      ...game.fields,
      thumbnail: { ...game.fields.thumbnail, url: "some url" },
    },
  };
});
