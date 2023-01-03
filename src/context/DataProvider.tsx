import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Create an interface for the riddle data type
interface IRiddle {
  title: string;
  question: string;
  answer: string;
}

// Create an interface for the joke data type
interface IJoke {
  joke: string;
}

// Create an interface for the context data type
interface IDataContext {
  riddles: IRiddle[];
  jokes: IJoke[];
  fetchRiddles: () => Promise<void>;
  fetchJokes: () => Promise<void>;
}

// Create the context object with the initial data values
export const DataContext = createContext<IDataContext>({
  riddles: [],
  jokes: [],
  fetchRiddles: () => Promise.resolve(),
  fetchJokes: () => Promise.resolve(),
});

// The provider component that will wrap around the entire app
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [riddles, setRiddles] = useState<IRiddle[]>([]);
  const [jokes, setJokes] = useState<IJoke[]>([]);

  const fetchRiddles = useCallback(async () => {
        try {
          const response = await fetch("https://api.api-ninjas.com/v1/riddles");
          const riddles = await response.json();
          setRiddles(riddles);
        } catch (error) {
          console.log(error);
        }
      }, []);

      const fetchJokes = useCallback(async () => {
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

  useEffect(() => {
    fetchRiddles();
    fetchJokes();
  }, []);

  return (
    <DataContext.Provider value={{ riddles, jokes, fetchRiddles, fetchJokes }}>
      {children}
    </DataContext.Provider>
  );
};

// A hook to make it easier to access the context data within a component
export const useData = () => useContext(DataContext);


// import * as React from "react";

// type DataContextType = {
//   riddles: string[];
//   jokes: string[];
//   fetchRiddles: () => void;
//   fetchJokes: () => void;
// };

// export const DataContext = React.createContext<DataContextType>({
//   riddles: [],
//   jokes: [],
//   fetchRiddles: () => {},
//   fetchJokes: () => {},
// });

// type DataProviderProps = {
//   children: React.ReactNode;   // need to learn more about ReactNode later on
// };

// export const DataProvider = ({ children }: DataProviderProps) => {
//   const [riddles, setRiddles] = React.useState<string[]>([]);
//   const [jokes, setJokes] = React.useState<string[]>([]);
 
//   const fetchRiddles = React.useCallback(async () => {
//     try {
//       const response = await fetch("https://api.api-ninjas.com/v1/riddles");
//       const riddles = await response.json();
//       setRiddles(riddles);
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);
  
//   const fetchJokes = React.useCallback(async () => {
//     const limit = 10;
//     try {
//       const response = await fetch("https://api.api-ninjas.com/v1/jokes?limit='" + limit,
//       {
//         headers: {
//                 "X-Api-Key": "0DhBnOBWv10+HOeWsN0T1w==KEfK5ymNm4BcPBud",
//               },
//       });
//       const jokes = await response.json();
//       setJokes(jokes);
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);
  
//   const value: DataContextType = {
//     riddles,
//     jokes,
//     fetchRiddles,
//     fetchJokes,
//   };

//   return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
// };

// export default DataProvider;
