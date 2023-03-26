export type filterType = {
  [key: string]: (text: string, params?: { [key: string]: number }) => string;
}
  
export type optionsType = {
  [key: string]: {
    name: string;
    active: boolean;
    params: {
      [key: string]: number;
    }
  };
}
