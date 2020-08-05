import { GameWithoutImage, Game, Image, Resp } from "../types";

export const pairGameWithImage = (
  gamesWithoutImages: GameWithoutImage[],
  images: Image[]
): Game[] => {
  return gamesWithoutImages.map((game) => {
    const imageId = game.fields.thumbnail.sys.id;
    const matchedImage = images.find(
      ({ sys: { id } }) => id === imageId
    ) as Image;
    const gameWithImage = {
      fields: {
        ...game.fields,
        thumbnail: {
          ...game.fields.thumbnail,
          url: matchedImage.fields.file.url,
        },
      },
    };
    return gameWithImage;
  });
};

export const addImagesToGames = (resp: Resp): Game[] => {
  const gamesWithoutImages: GameWithoutImage[] = resp.data.items;
  const images: Image[] = resp.data.includes.Asset;
  const gamesWithImages: Game[] = pairGameWithImage(gamesWithoutImages, images);
  return gamesWithImages;
};
