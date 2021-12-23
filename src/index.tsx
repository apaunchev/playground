import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Code, Save } from "react-feather";
import { Editor } from "./components/Editor";
import { GlobalStyles } from "./components/GlobalStyles";
import { Preview } from "./components/Preview";
import { IconButton } from "./components/IconButton";

const initialSnippet = {
  html: `<div id="root"></div>`,
  css: `#root { font-family: sans-serif; }`,
  javascript: `render(<h1>Playground</h1>)`,
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
      <Wrapper>
        <Header>
          <HeaderTitle>Playground</HeaderTitle>
          <HeaderActions>
            <IconButton icon={<Save />} text="Save" onClick={(e) => true} />
            <IconButton icon={<Code />} text="Format" onClick={(e) => true} />
          </HeaderActions>
        </Header>
        <Editor snippet={snippet} onChange={handleChange} />
        <Preview snippet={snippet} />
      </Wrapper>
      <GlobalStyles />
    </React.StrictMode>
  );
};

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: hsl(229deg 14% 22% / 50%);
  line-height: 1;
  cursor: default;
`;

const HeaderTitle = styled.p`
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
  font-size: 1rem;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

ReactDOM.render(<App />, document.querySelector("#root"));
