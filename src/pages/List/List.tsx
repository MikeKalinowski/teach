import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Game } from "../../types";
import { Link } from "react-router-dom";
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

interface Props {
  games: (Game | null)[];
}

const List: React.FC<Props> = ({ games }) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={8}>
        {games?.length > 0 &&
          games.map((game) => (
            <Grid item key={game!.fields.name} xs={12} sm={6} md={6}>
              <Card className={classes.card}>
                <CardActionArea>
                  <Link
                    to={`/game/${game!.fields.name.split(" ").join(".")}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <CardMedia
                      component="img"
                      image={game!.fields.thumbnail.url}
                      title={game!.fields.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h5" component="h2">
                        {game!.fields.name}
                      </Typography>
                    </CardContent>
                  </Link>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default List;
