import * as React from "react";

export type DataContextType = {
  riddles: string[];
  jokes: string[];
  fetchRiddles: () => void;
  fetchJokes: () => void;
};

export const DataContext = React.createContext<DataContextType>({
  riddles: [],
  jokes: [],
  fetchRiddles: () => {},
  fetchJokes: () => {},
});

type DataProviderProps = {
  children: React.ReactNode;   // need to learn more about ReactNode later on
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [riddles, setRiddles] = React.useState<string[]>([]);
  const [jokes, setJokes] = React.useState<string[]>([]);
 
  const fetchRiddles = React.useCallback(async () => {
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/riddles");
      const riddles = await response.json();
      setRiddles(riddles);
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  const fetchJokes = React.useCallback(async () => {
    const limit = 10;
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/jokes?limit='" + limit,
      {
        headers: {
                "X-Api-Key": "0DhBnOBWv10+HOeWsN0T1w==KEfK5ymNm4BcPBud",
              },
      });
      const jokes = await response.json();
      setJokes(jokes);
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  const value: DataContextType = {
    riddles,
    jokes,
    fetchRiddles,
    fetchJokes,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
