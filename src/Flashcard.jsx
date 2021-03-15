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
    props.onClick();
    setAnimationSwitch((prevAnimationSwitch) => !prevAnimationSwitch);
  };

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
      <div className="Flashcard" ref={FlashcardRef} onClick={handleClick}>
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
