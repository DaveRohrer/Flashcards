import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import "./index.css";

function Flashcard(props) {
  const [verticalSpaceForImg, setVerticalSpaceForImg] = useState("300px");
  const FlashcardRef = useRef(null);
  const TextContainerRef = useRef(null);

  const handleClick = () => {
    if (!animationIsRunning) {
      setAnimProps({ xys: [0, 0, 0.9] });
      setClickWasRequested(true);
      setAnimationIsRunning(true);
    }
  };

  const handleRest = () => {
    setAnimProps({ xys: [0, 0, 1.0] });
    setAnimationIsRunning(false);
    setClickWasRequested(false);
  };

  const [clickWasRequested, setClickWasRequested] = useState(false);
  const [animationIsRunning, setAnimationIsRunning] = useState(true);

  const [animProps, setAnimProps] = useSpring(() => ({
    from: { xys: [0, 0, 0.9] },
    xys: [0, 0, 1],
    config: { mass: 1, tension: 450, friction: 10 },
    onRest: handleRest,
  }));

  useEffect(() => {
    setVerticalSpaceForImg(
      FlashcardRef.current.offsetHeight - TextContainerRef.current.offsetHeight
    );
    if (!animationIsRunning && clickWasRequested) {
      props.onClick();
    }
  }, [clickWasRequested, animationIsRunning, props]);

  // not using the rotation currently. Leaving it here for now in case I change my mind.
  // may be important if we ever wanted to have multiple transition animations come in
  // randomly for the deck

  const transform = (x, y, s) =>
    `rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  return (
    <animated.div
      className="InvisibleFlashcard"
      onClick={handleClick}
      style={{ transform: animProps.xys.interpolate(transform) }}
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
