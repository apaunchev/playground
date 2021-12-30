import prettier from "prettier";
import babelParser from "prettier/parser-babel";
import htmlParser from "prettier/parser-html";
import cssParser from "prettier/parser-postcss";
import { SkipBack, Zap } from "react-feather";
import styled from "styled-components";
import { Editor } from "../components/Editor";
import { GlobalStyles } from "../components/GlobalStyles";
import { IconButton } from "../components/IconButton";
import { Preview } from "../components/Preview";
import { useStickyState } from "../hooks/useStickyState";
import { ISnippet } from "../types";

const initialSnippet = {
  html: `<div id="root"></div>`,
  css: `#root { font-family: sans-serif; }`,
  javascript: `render(<h1>Playground</h1>)`,
};

export const App: React.FC = () => {
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
    const newSnippet: { [key: string]: string } = {
      html: snippet.html,
      css: snippet.css,
      javascript: snippet.javascript,
    };

    function format(
      code: string,
      parser: string,
      plugins: (string | prettier.Plugin<any>)[]
    ) {
      return prettier
        .format(code, {
          parser,
          plugins,
        })
        .replace(/\n$/, "");
    }

    Object.entries(newSnippet).forEach(([language, code]) => {
      if (language === "html") {
        newSnippet.html = format(code, "html", [htmlParser]);
      } else if (language === "css") {
        newSnippet.css = format(code, "css", [cssParser]);
      } else if (language === "javascript") {
        newSnippet.javascript = format(code, "babel", [babelParser]);
      }
    });

    setSnippet(newSnippet);
  }

  return (
    <>
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
    </>
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
