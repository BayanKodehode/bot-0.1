import * as React from "react";

export type DataContextType = {
  riddles: string[];
  jokes: string[];
  fetchRiddles: () => void;
  fetchJokes: () => void;
};

const DataContext = React.createContext<DataContextType>({
  riddles: [],
  jokes: [],
  fetchRiddles: () => {},
  fetchJokes: () => {},
});

export default DataContext;
