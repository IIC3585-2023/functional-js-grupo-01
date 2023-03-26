import "./style.css";

import { useState } from "react";

import exampleText from "../example/input.txt?raw";
import { transform } from "../lib";
import { TransformationConfig } from "../lib/filters";

import OptionsDialog from "./dialog/OptionsDialog";
import { useLocalStorage } from "../lib/useLocalStorage";

export default function App(): JSX.Element {
  const [text, setText] = useLocalStorage("fs-text", exampleText);
  const [options, setOptions] = useLocalStorage<TransformationConfig[]>("fp-options", []);

  return (
    <>
      <div className="container py-4 mx-0 min-w-full flex flex-col items-center bg-gray-100 border-b">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-3"> Functional JS</h1>
        <OptionsDialog
          options={options}
          setOptions={setOptions}
          reset={() => {
            setText("");
            setOptions([]);
          }}
        />
      </div>
      <div className="grid grid-cols-2 flex-grow text-sm sm:text-base">
        <textarea className="p-2" value={text} onChange={(e) => setText(e.target.value)} />
        <textarea className="p-2" value={transform(text, options)} disabled />
      </div>
    </>
  );
}
