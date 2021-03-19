import "./App.css";
import Flashcard from "./Flashcard";
import { useEffect, useState } from "react";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    setCurrentIndex(
      (prevCurrentIndex) => (prevCurrentIndex + 1) % prompts.length
    );
  };

  const [prompts, setPrompts] = useState([]);

  const getFlashcardJSON = () => {
    return new Promise((resolve) => {
      fetch("/cards")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setPrompts(
            data.map((element) => {
              return {
                leftPrompt: element.left_prompt,
                rightPrompt: element.right_prompt,
                image: element.image_path,
              };
            })
          );
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    });
  };

  useEffect(() => {
    getFlashcardJSON();
  }, []);

  const defaultPrompt = {
    leftPrompt: "A",
    rightPrompt: "a",
    image: images.apple,
  };
  console.log(prompts);
  return (
    <Flashcard
      prompts={prompts[0] ? prompts[currentIndex] : defaultPrompt}
      onClick={handleClick}
    />
  );
}

export default App;
