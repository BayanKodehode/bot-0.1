import { useState, useEffect, useContext } from "react";
import { generateResponse } from "./responseGenerator";
import { HideShowButtons, ButtonProps } from "./HideShowButtons";
import DataProvider from "..//context/DataProvider";
import DataContext from "..//context/DataContext";

interface IBot {
  greeting: string;
}

export const Bot = ({ greeting }: IBot) => {
  const [conversation, setConversation] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const { riddles, jokes, fetchRiddles, fetchJokes } = useContext(DataContext);

  const onRiddleRequest = async () => {
    try {
      await fetchRiddles();
      if (riddles.length > 0) {
        setConversation([
          <>
            {riddles[0].title}
            <br />
            <br />
            {riddles[0].question}
            <br />
            <br />
            {riddles[0].answer}
          </>,
        ]);
        console.log(riddles);
      } else {
        // handle case where riddles array is empty
        // need to find a solution to this later
        setConversation([
          "Sorry, but don't give up! Keep trying and maybe you'll get lucky.",
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onJokeRequest = async () => {
    try {
      await fetchJokes();
      if (jokes.length > 0) {
        setConversation([<>{jokes[0].joke}</>]);
        console.log(jokes);
      } else {
        // handle case where jokes array is empty
        // need to find a solution to this later
        setConversation([
          "Don't worry though, just click again and maybe I'll have a joke for you next time!",
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  useEffect(() => {
    document.title = `${name} in the house`;
  }, [name]);

  return (
    <div className="m-4 rounded-t-3xl text-3xl text-white ">
      {conversation.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
      {!name && (
        <form
          className="text-black"
          onSubmit={(e) => {
            e.preventDefault();
            setName(message);
            setTimeout(() => {
              setConversation([
                ...conversation,
                `${greeting} ${message}, What can I help you with ?`,
              ]);
            }, 3000);
            setMessage("");
          }}
        >
          <input
            autoFocus
            className=" min-w-full cursor-pointer m-3 p-3 rounded-full "
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hello! What's your name ?"
          />
          <button
            className="text-white p-3 animate-pulse cursor-pointer rounded-xl bg-gradient-to-r from-gray-500 to-indigo-600"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
      {name && (
        <form
          className="text-black"
          onSubmit={(e) => {
            e.preventDefault();
            setConversation([...conversation, message]);
            setConversation([
              ...conversation,
              generateResponse(message, greeting, toggleVisibility),
            ]);
            setMessage("");
          }}
        >
          <input
            autoFocus
            className="cursor-pointer m-3 p-3 rounded-full"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="text-white m-4 p-3 animate-pulse cursor-pointer bg-gradient-to-r from-gray-500 to-indigo-600 box-border rounded-xl"
            type="submit"
          >
            Send
          </button>
          <HideShowButtons
            onRiddleRequest={onRiddleRequest}
            onJokeRequest={onJokeRequest}
            visibility={visibility}
          />
        </form>
      )}
    </div>
  );
};

export default Bot;
