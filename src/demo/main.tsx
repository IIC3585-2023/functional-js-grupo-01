import "./style.css";

import exampleText from "../example/input.txt?raw";
import { transform } from "../lib";
import { useState } from "react";

export default function App() {
  const [text, setText] = useState(exampleText);

  return (
    <div className="grid grid-cols-2 min-h-full">
      <textarea className="p-2" value={text} onChange={(e) => setText(e.target.value)} />
      <textarea className="p-2" value={transform(text, {})} disabled />
    </div>
  );
}
