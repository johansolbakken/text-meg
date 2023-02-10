import { useState, KeyboardEvent, useEffect } from "react";
import { Writer } from "./Letter";

const Text = ({ text }: { text: string }) => {
  return (
    <div
      style={{
        color: "black",
        minWidth: 6,
      }}
    >
      {text}
    </div>
  );
};

const Cursor = () => {
  return (
    <div
      style={{
        background: "black",
        width: 3,
        height: 20,
      }}
    ></div>
  );
};

export const TextField = () => {
  const [writer, setWriter] = useState(new Writer());

  const [textList, setTextList] = useState<React.ReactNode[]>([]);
  const [focus, setFocus] = useState(false);
  const [change, setChange] = useState(false);

  const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.key.length == 1 && e.key.match(/[a-zA-Z0-9]| |.|!|\?|\/|=/)) {
      writer.addLetter({ text: e.key, index: 0 });
    }
    if (e.key === "Space") {
      writer.addLetter({ text: " ", index: 0 });
    }
    if (e.key === "Escape") {
      setFocus(false);
    }
    if (e.key == "ArrowRight") {
      writer.cursorRight();
    }
    if (e.key == "ArrowLeft") {
      writer.cursorLeft();
    }
    if (e.key == "Backspace")
    {
        writer.deleteLetter()
    }
    
    setChange(true);
  };

  useEffect(() => {
    if (change) {
      const listOfText = writer.letters.map((letter) => (
        <Text text={letter.text} key={letter.index} />
      ));
      const cursor = writer.cursorPos();
      const listOfText2 = [
        ...listOfText.slice(0, cursor),
        <Cursor key={"Cursor"} />,
        ...listOfText.slice(cursor, listOfText.length),
      ];

      setTextList(listOfText2);
      setChange(false);
    }
  }, [change]);

  return (
    <div
      style={{
        background: "#fff",
        width: 800,
        height: 600,
        display: "flex",
        justifyContent: "left",
        flexWrap: "wrap",
      }}
      tabIndex={focus ? 0 : undefined}
      onClick={() => setFocus(true)}
      onKeyDown={keyDownHandler}
    >
      {textList}
    </div>
  );
};
