import logo from "./logo.svg";
import "./App.css";
import Flashcard from "./Flashcard";
import { useState } from "react";
import images from "./images/index";

function App() {
  const [currentIndex, setCurrentindex] = useState();
  //for now array of characters can go here
  //also logic for switching between goes here
  const prompts = [
    { leftPrompt: "A", rightPrompt: "a", image: images.apple },
    { leftPrompt: "B", rightPrompt: "b", image: images.ball },
    { leftPrompt: "C", rightPrompt: "c", image: images.cat },
    { leftPrompt: "D", rightPrompt: "d", image: images.dog },
  ];

  //presentation/container components will be useful
  return <Flashcard prompts={prompts[0]} />;
}

export default App;
