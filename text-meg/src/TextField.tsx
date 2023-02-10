import { useState, KeyboardEvent, useEffect } from "react";

const Text = ({ text }: { text: string }) => {
  return (
    <div
      style={{
        color: "black",
        minWidth: 6
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
  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(0);
  const [textList, setTextList] = useState<React.ReactNode[]>([]);
  const [focus, setFocus] = useState(false);

  const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.key.length == 1 && e.key.match(/[a-zA-Z0-9]| |.|!|\?|\/|=/)) {
      setText(text + e.key);
      setCursor(cursor + 1);
    }
    if (e.key === "Space") {
      setText(text + " ");
      setCursor(cursor + 1);
    }
  };

  useEffect(() => {
    const listOfText = text
      .split("")
      .map((letter, index) => <Text text={letter} key={index} />);
    const listOfText2 = [
      ...listOfText.slice(0, cursor),
      <Cursor key={"Cursor"} />,
      ...listOfText.slice(cursor, listOfText.length),
    ];

    setTextList(listOfText2);
  }, [text, cursor]);

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
      tabIndex={1}
      onClick={() => setFocus(true)}
      onKeyDown={keyDownHandler}
    >
      {textList}
    </div>
  );
};
