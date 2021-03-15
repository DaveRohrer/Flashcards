import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import "./index.css";

function Flashcard(props) {
  const [verticalSpaceForImg, setVerticalSpaceForImg] = useState("300px");
  const FlashcardRef = useRef(null);
  const TextContainerRef = useRef(null);

  useEffect(() => {
    setVerticalSpaceForImg(
      FlashcardRef.current.offsetHeight - TextContainerRef.current.offsetHeight
    );
  });

  const handleClick = () => {
    if (animationIsRunning) {
      return;
    } else {
      setAnimationIsRunning(true);
      setClickWasRequested(true);
    }
  };

  const [animationIsRunning, setAnimationIsRunning] = useState(false);
  const [clickWasRequested, setClickWasRequested] = useState(false);
  const { x } = useSpring({
    from: { x: 0 },
    x: 1,
    config: { duration: 500 },
    reset: animationIsRunning,
    onRest: () => {
      setAnimationIsRunning(false);
      if (clickWasRequested) {
        setClickWasRequested(false);
        props.onClick();
      }
    },
  });

  return (
    <animated.div
      onClick={handleClick}
      style={{
        opacity: 1,
        transform: x
          .interpolate({
            range: [0, 0.15, 0.85, 1],
            output: [1, 0.95, 0.95, 1],
          })
          .interpolate((x) => `scale(${x})`),
      }}
    >
      <div className="Flashcard" ref={FlashcardRef}>
        <div className="FlashcardTextContainer" ref={TextContainerRef}>
          <div className="FlashcardText">{props.prompts.leftPrompt}</div>
          <div className="FlashcardText AlignRight">
            {props.prompts.rightPrompt}
          </div>
        </div>
        <div className="FlashcardImageContainer">
          <img
            src={props.prompts.image}
            className="FlashcardImage"
            height={verticalSpaceForImg}
          />
        </div>
      </div>
    </animated.div>
  );
}

export default Flashcard;
