import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor } from "./components/Editor";
import { GlobalStyles } from "./components/GlobalStyles";
import { Preview } from "./components/Preview";

const initialSnippet = {
  html: `<div id="root"></div>`,
  css: `#root { font-family: sans-serif; }`,
  javascript: `render(<h1>playground</h1>)`,
};

const App: React.FC = () => {
  const [snippet, setSnippet] = useState(initialSnippet);

  const handleChange = (changedContent: string, changedType: string) => {
    setSnippet((snippet) => ({
      ...snippet,
      [changedType]: changedContent,
    }));
  };

  return (
    <React.StrictMode>
      <div className="playground">
        <Editor snippet={snippet} onChange={handleChange} />
        <Preview snippet={snippet} />
      </div>
      <GlobalStyles />
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
