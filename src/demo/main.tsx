import "./style.css";

import exampleText from "../example/input.txt?raw";

import { useState, useCallback } from "react";
import { transform } from "../lib";
import { optionsType } from "../lib/types";

import OptionsDialog from "./dialog/OptionsDialog";

export default function App(): JSX.Element {
  const [text, setText] = useState(exampleText);
  const [transformedText, setTransformedText] = useState(transform(text));

  /**
   * Callback function for when the options are saved.
   * Executes the transform function with the new options.
   * 
   * @param options - The new options to use in the transform function.
   */
  const onSave = useCallback((options: optionsType) => {
    setTransformedText(transform(text, options));
  }, []);

  return (
    <>
      <div className="container py-4 px-10 mx-0 min-w-full flex flex-col items-center">
        <OptionsDialog 
          saveOptions={onSave}
        />
      </div>
      <div className="grid grid-cols-2 min-h-full">
        <textarea className="p-2" value={text} onChange={(e) => setText(e.target.value)} />
        <textarea className="p-2" value={transformedText} disabled />
      </div>
    </>
  );
}
