import React from "react";
import axios from "axios";
import { apiConfig } from "../../utils/apiConfig";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Card,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export interface Image {
  fields: {
    file: {
      url: string;
    };
  };
  sys: {
    id: string;
  };
}

export interface Game {
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

export interface GameWithoutImage {
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

export interface Resp {
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
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={8}>
        {games.length > 0 &&
          games.map((game) => (
            <Grid item key={game!.fields.name} xs={12} sm={6} md={6}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => console.log("clicked")}>
                  <CardMedia
                    component="img"
                    image={game!.fields.thumbnail.url}
                    title={game!.fields.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {game!.fields.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default List;
