import { useState } from "react";
import ReactDOM from "react-dom";
import { Editor } from "./components/editor";
import { Preview } from "./components/preview";

const initialSnippet = {
  html: `<div id="root"></div>`,
  css: `#root { font-family: sans-serif; }`,
  javascript: `
    import * as React from 'https://cdn.skypack.dev/react';
    import * as ReactDOM from 'https://cdn.skypack.dev/react-dom';
    const App = () => <h1>App</h1>;
    ReactDOM.render(<App />, document.getElementById("root"));
  `,
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
    <div className="playground">
      <Editor snippet={snippet} onChange={handleChange} />
      <Preview snippet={snippet} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
