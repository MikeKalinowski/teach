import React from "react";
import { useParams, Link } from "react-router-dom";
import { Game } from "../../types";
import { Typography, Button, Container, Box } from "@material-ui/core";

interface Props {
  games?: (Game | null)[];
}

const GameComp: React.FC<Props> = ({ games }) => {
  let { name } = useParams();
  const parsedName = name.split(".").join(" ");
  const selectedGame = games?.find((game) => game?.fields.name === parsedName);

  return selectedGame ? (
    <Container maxWidth="md">
      <Box pb={6}>
        <Typography variant="h2">{selectedGame.fields.name}</Typography>
      </Box>
      <div>
        <Box pb={1}>
          <Typography variant="h4">STEPS:</Typography>
        </Box>
        {selectedGame.fields.steps.map((step, i) => (
          <Typography key={step} gutterBottom variant="body1">
            {`${i + 1}. ${step}`}
          </Typography>
        ))}
      </div>
      <Box pt={6} pb={1}>
        <Typography variant="h4">NOTES:</Typography>
      </Box>
      <Box pt={8}>
        <Link to={`/`}>
          <Button variant="contained">Back to list</Button>
        </Link>
      </Box>
    </Container>
  ) : null;
};

export default GameComp;
