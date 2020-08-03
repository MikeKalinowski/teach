import React from "react";
import axios from "axios";
import { apiConfig } from "../../utils/apiConfig";

interface Image {
  fields: {
    file: {
      url: string;
    };
  };
  sys: {
    id: string;
  };
}

interface Game {
  fields: {
    name: string;
    steps: Array<string>;
    thumbnail: {
      url: string;
      sys: {
        id: string;
      };
    };
  };
}

interface GameWithoutImage {
  fields: {
    name: string;
    steps: Array<string>;
    thumbnail: {
      sys: {
        id: string;
      };
    };
  };
}

interface Resp {
  data: { items: GameWithoutImage[]; includes: { Asset: Image[] } };
}

const pairGameWithImage = (
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

const addImagesToGames = (resp: Resp): Game[] => {
  const gamesWithoutImages: GameWithoutImage[] = resp.data.items;
  const images: Image[] = resp.data.includes.Asset;
  const gamesWithImages: Game[] = pairGameWithImage(gamesWithoutImages, images);
  return gamesWithImages;
};

const List = () => {
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
    <p>
      {games.length > 0 &&
        games.map((game) => (
          <>
            <img src={game?.fields.thumbnail.url} alt="game thumbnail" />
            <p>Name: {game?.fields.name}</p>
            <p>Steps: {game?.fields.steps}</p>
          </>
        ))}
    </p>
  );
};

export default List;
