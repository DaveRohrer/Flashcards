import "./App.css";
import Flashcard from "./Flashcard";
import { useState } from "react";
import images from "./images";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    setCurrentIndex((prevCurrentIndex) =>
      prevCurrentIndex >= Object.keys(images).length - 1
        ? 0
        : prevCurrentIndex + 1
    );
  };

  const prompts = [
    { leftPrompt: "A", rightPrompt: "a", image: images.apple },
    { leftPrompt: "B", rightPrompt: "b", image: images.ball },
    { leftPrompt: "C", rightPrompt: "c", image: images.cat },
    { leftPrompt: "D", rightPrompt: "d", image: images.dog },
  ];

  return <Flashcard prompts={prompts[currentIndex]} onClick={handleClick} />;
}

export default App;
