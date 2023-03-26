import "./style.css";

import { useState } from "react";

import exampleText from "../example/input.txt?raw";
import { transform, TransformationConfig } from "../lib";

import OptionsDialog from "./dialog/OptionsDialog";

export default function App(): JSX.Element {
  const [text, setText] = useState(exampleText);
  const [options, setOptions] = useState<TransformationConfig[]>([]);

  return (
    <>
      <div className="container py-4 px-10 mx-0 min-w-full flex flex-col items-center">
        <OptionsDialog options={options} setOptions={setOptions} />
      </div>
      <div className="grid grid-cols-2 min-h-full">
        <textarea className="p-2" value={text} onChange={(e) => setText(e.target.value)} />
        <textarea className="p-2" value={transform(text, options)} disabled />
      </div>
    </>
  );
}
