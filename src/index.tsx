import prettier from "prettier";
import babelParser from "prettier/parser-babel";
import htmlParser from "prettier/parser-html";
import cssParser from "prettier/parser-postcss";
import React from "react";
import ReactDOM from "react-dom";
import { SkipBack, Zap } from "react-feather";
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

  function handleResetEditor() {
    setSnippet(initialSnippet);
  }

  function handleFormatSnippet() {
    let snippetCopy: { [key: string]: string } = snippet;
    let formattedSnippet: ISnippet = { html: "", css: "", javascript: "" };

    function format(code: string, parser: string, plugins: any[]) {
      return prettier
        .format(code, {
          parser,
          plugins,
          useTabs: false,
          semi: true,
        })
        .replace(/\n$/, "");
    }

    Object.entries(snippetCopy).forEach(([language, code]) => {
      if (language === "html") {
        formattedSnippet.html = format(code, "html", [htmlParser]);
      } else if (language === "css") {
        formattedSnippet.css = format(code, "css", [cssParser]);
      } else if (language === "javascript") {
        formattedSnippet.javascript = format(code, "babel", [babelParser]);
      }
    });

    setSnippet(formattedSnippet);
  }

  return (
    <React.StrictMode>
      <Wrapper>
        <Header>
          <HeaderTitle>Code Playground</HeaderTitle>
          <HeaderActions>
            <IconButton
              icon={<SkipBack size={18} />}
              text="Reset editor"
              onClick={handleResetEditor}
            />
            <IconButton
              icon={<Zap size={18} />}
              text="Format with Prettier"
              onClick={handleFormatSnippet}
            />
          </HeaderActions>
        </Header>
        <Content>
          <Editor snippet={snippet} onChange={handleChange} />
          <Preview snippet={snippet} />
        </Content>
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
  padding: 6px 16px;
  background-color: var(--color-header);
  cursor: default;
`;

const HeaderTitle = styled.p`
  display: flex;
  gap: 6px;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  font-size: ${14 / 16}rem;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 8px;
`;

const Content = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: row;

  > * {
    flex: 1 1 0%;
  }
`;

ReactDOM.render(<App />, document.querySelector("#root"));
