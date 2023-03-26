import "./style.css";

import exampleText from "../example/input.txt?raw";

import { useState, useEffect, useCallback } from "react";
import { transform, defaultOptions } from "../lib";
import { optionsType } from "../lib/types";

import OptionsDialog from "./dialog/OptionsDialog";
import useLocalStorage from "../hooks/useLocalStorage";

export default function App(): JSX.Element {
  // const [text, setText] = useState(exampleText);
  const [currentText, storedText] = useLocalStorage(exampleText);
  const [text, setText] = useState(currentText || exampleText);

  useEffect(() => {
    storedText(text);
  }, [text]);

  // const [options, setOptions] = useState(defaultOptions);
  const [currentOptions, storedOptions] = useLocalStorage(defaultOptions);
  const [options, setOptions] = useState(currentOptions || defaultOptions);

  useEffect(() => {
    storedOptions(options);
  }, [options]);

  /**
   * Callback function for when the options are saved.
   * Save the new options in the state.
   * 
   * @param options - The new options to use in the transform function.
   */
  const onSave = useCallback((options: optionsType) => {
    setOptions((prev) => ({ ...prev, ...options }));
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
        <textarea className="p-2" value={transform(text, options)} disabled />
      </div>
    </>
  );
}
