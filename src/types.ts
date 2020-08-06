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
    notes: string;
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
    notes: string;
  };
}

export interface Resp {
  data: { items: GameWithoutImage[]; includes: { Asset: Image[] } };
}
