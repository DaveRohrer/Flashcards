import React, { useState, useEffect, useRef } from "react";
import "./index.css";

function Flashcard(props) {
  const [verticalSpaceForImg, setVerticalSpaceForImg] = useState("300px");
  const FlashcardRef = useRef(null);
  const TextContainerRef = useRef(null);

  useEffect(() => {
    // Update the document title using the browser API
    setVerticalSpaceForImg(
      FlashcardRef.current.offsetHeight - TextContainerRef.current.offsetHeight
    );
  });

  return (
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
  );
}

export default Flashcard;
