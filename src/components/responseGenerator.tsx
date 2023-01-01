import { DataContextType } from '../context/DataContext';

export const handleJokeRequest = async (context: DataContextType) => {
  const { fetchJokes, jokes, setConversation } = context;

     try {
        await fetchJokes();
        if (jokes.length > 0) {
          setConversation([ <>{jokes[0].joke}</>]);
          console.log(jokes);
        } else {
          // handle case where jokes array is empty
          // need to find a solution to this later
          console.log("No jokes available");
          setConversation(["Don't worry though, just click again and maybe I'll have some more for you next time!"]);
        }
      } catch (error) {
        console.log(error);
      }
    };

export const handleRiddleRequest = async (context: DataContextType) => {
  const { fetchRiddles, riddles, setConversation } = context;

  try {
        await fetchRiddles();
        if (riddles.length > 0) {
          setConversation([
            <>
              {riddles[0].title}
              <br />
              {riddles[0].question}
              <br />
              {riddles[0].answer}
            </>,
          ]);
          console.log(riddles);
        } else {
          // handle case where riddles array is empty
          // need to find a solution to this later
          console.log("No riddles available");
          setConversation(["Sorry, but don't give up! Keep trying and maybe you'll get lucky."]);
        }
      } catch (error) {
        console.log(error);
      }
    };
 