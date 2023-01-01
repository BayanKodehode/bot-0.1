import * as React from "react";
import { Bot } from "./components/bot";
import { DataProvider } from "./context/DataProvider";

function BoxWrapper() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-gray-300 to-indigo-500 ">
      <h1 className="text-center text-5xl mb-4 font-display text-white ">
        Chat Bot 0.1
      </h1>
      <div className="p-8 text-center text-3xl font-mono" >
      <p>The project involves building a chatbot that can hold a conversation with a user.</p>
      <p> React TypeScript TailWind for building the user interface.</p>
      <p> Context API for managing state within the chatbot component.</p>
      <p>Riddles and jokes: The project can provide riddles and jokes to the user upon request.</p>
      <p>Form handling: The project involves handling form submissions and input changes in order to update the conversation between the user and the chatbot.</p>
    </div>
    <div className="z-0 fixed right-1 bottom-0 text-xl px-0 rounded-t-3xl text-white bg-gradient-to-r from-indigo-600 to-gray-500">
      {!isOpen && (
        <button
          className=" p-3 px-2 m-5 rounded-l-3xl fixed right-0 bottom-0 bg-gradient-to-r from-indigo-500 to-gray-400"
          onClick={handleOpen}
        >
          Chat with me ?
        </button>
      )}
      {isOpen && (
        <div className="max-w-4xl font-chatFont  z-50 rounded-t-3xl bg-gradient-to-r from-indigo-600 to-gray-500 bg-white ">
          <button
            className=" bg-red-700 p-2 m-4 rounded-t-2xl "
            onClick={handleClose}
          >
            x
          </button>
          <DataProvider>
          <Bot greeting="Hello" />
          </DataProvider>
        </div>
      )}
    </div>
    </div>
  );
}

export default BoxWrapper;
