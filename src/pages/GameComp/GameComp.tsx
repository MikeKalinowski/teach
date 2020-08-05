import React from "react";
import { Game } from "../../types";

interface Props {
  games?: (Game | null)[];
}

const GameComp: React.FC<Props> = ({ games }) => {
  return <div>Star Wars</div>;
};

export default GameComp;
