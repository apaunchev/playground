import React from "react";
import ReactDOM from "react-dom";
import { Code, Settings } from "react-feather";
import styled from "styled-components";
import { Editor } from "./components/Editor";
import { GlobalStyles } from "./components/GlobalStyles";
import { IconButton } from "./components/IconButton";
import { Preview } from "./components/Preview";
import { useStickyState } from "./hooks/useStickyState";
import { ISnippet } from "./types";

const initialSnippet = {
  html: `<div id="root"></div>`,
  css: `#root { font-family: sans-serif; }`,
  javascript: `render(<h1>Playground</h1>)`,
};

const App: React.FC = () => {
  const [snippet, setSnippet] = useStickyState(initialSnippet, "snippet");

  const handleChange = (changedContent: string, changedType: string) => {
    setSnippet((snippet: ISnippet) => ({
      ...snippet,
      [changedType]: changedContent,
    }));
  };

  return (
    <React.StrictMode>
      <Wrapper>
        <Header>
          <HeaderTitle>
            <Code size={18} /> Playground
          </HeaderTitle>
          <HeaderActions>
            <IconButton
              icon={<Settings size={21} />}
              text="Settings"
              onClick={(e) => true}
            />
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
  padding: 8px 16px;
  background-color: var(--color-header);
  line-height: 1;
  cursor: default;
`;

const HeaderTitle = styled.p`
  display: flex;
  gap: 6px;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  font-size: 1rem;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

ReactDOM.render(<App />, document.querySelector("#root"));
