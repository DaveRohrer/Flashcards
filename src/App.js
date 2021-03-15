import "./App.css";
import Flashcard from "./Flashcard";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import images from "./images";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    setCurrentIndex(
      (prevCurrentIndex) => (prevCurrentIndex + 1) % Object.keys(images).length
    );
    setAnimationSwitch(
      (prevAnimationSwitch) => prevAnimationSwitch == animationSwitch
    );
  };

  const prompts = [
    { leftPrompt: "A", rightPrompt: "a", image: images.apple },
    { leftPrompt: "B", rightPrompt: "b", image: images.ball },
    { leftPrompt: "C", rightPrompt: "c", image: images.cat },
    { leftPrompt: "D", rightPrompt: "d", image: images.dog },
  ];

  const [animationSwitch, setAnimationSwitch] = useState(true);
  const { x } = useSpring({
    from: { x: 0 },
    x: animationSwitch ? 1 : 0,
    config: { duration: 1000 },
  });

  return (
    <animated.div
      onClick={() => setAnimationSwitch(!animationSwitch)}
      style={{
        opacity: 1,
        transform: x
          .interpolate({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
          })
          .interpolate((x) => `scale(${x})`),
      }}
    >
      <Flashcard prompts={prompts[currentIndex]} onClick={handleClick} />
    </animated.div>
  );
}

export default App;
