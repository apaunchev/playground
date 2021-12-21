import { useState } from "react";
import { Editor } from "./editor";
import { Preview } from "./preview";

const initialSnippet = {
  html: "<h1>hello</h1>",
  css: "h1 { color: green }",
  javascript: "console.log(1)",
};

interface PlaygroundProps {}

export const Playground: React.FC<PlaygroundProps> = () => {
  const [snippet, setSnippet] = useState(initialSnippet);

  const handleChange = (changedContent: string, changedType: string) => {
    setSnippet((snippet) => ({
      ...snippet,
      [changedType]: changedContent,
    }));
  };

  return (
    <div className="playground">
      <Editor snippet={snippet} onChange={handleChange} />
      <Preview snippet={snippet} />
    </div>
  );
};
