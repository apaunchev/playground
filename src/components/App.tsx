import Splitter, { GutterTheme, SplitDirection } from "@devbookhq/splitter";
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
const initialSplitSizes = [50, 50]; // %
const minSplitWidths = [400, 400]; // px

const formatCode = (
  code: string,
  parser: string,
  plugins: (string | prettier.Plugin<any>)[]
) => {
  return prettier.format(code, {
    parser,
    plugins,

    // Match Monaco editor's line endings to prevent a silly rerender of all
    // components that take the snippet (https://github.com/microsoft/vscode/issues/127).
    endOfLine: "crlf",
  });
};

export const App: React.FC = () => {
  const [snippet, setSnippet] = useStickyState(initialSnippet, "snippet");
  const [splitSizes, setSplitSizes] = useStickyState(
    initialSplitSizes,
    "splitSizes"
  );

  const handleSnippetChange = (value: string | undefined, type: string) => {
    if (value === undefined) {
      return;
    }

    setSnippet((snippet: ISnippet) => ({
      ...snippet,
      [type]: value,
    }));
  };

  const handlePlaygroundReset = () => {
    setSnippet(initialSnippet);
    setSplitSizes(initialSplitSizes);
  };

  const handleSnippetFormat = () => {
    const html = formatCode(snippet.html, "html", [htmlParser]);
    const css = formatCode(snippet.css, "css", [cssParser]);
    const javascript = formatCode(snippet.javascript, "babel", [babelParser]);

    setSnippet({
      html,
      css,
      javascript,
    });
  };

  const handleResizeFinished = (_: number, newSizes: number[]) => {
    setSplitSizes(newSizes);
  };

  return (
    <>
      <Wrapper>
        <Header>
          <HeaderTitle>Playground</HeaderTitle>
          <HeaderActions>
            <IconButton
              icon={<SkipBack size={18} />}
              text="Reset playground"
              onClick={handlePlaygroundReset}
            />
            <IconButton
              icon={<Zap size={18} />}
              text="Format with Prettier"
              onClick={handleSnippetFormat}
            />
          </HeaderActions>
        </Header>
        <Splitter
          direction={SplitDirection.Horizontal}
          minWidths={minSplitWidths}
          initialSizes={splitSizes}
          gutterTheme={GutterTheme.Dark}
          onResizeFinished={handleResizeFinished}
        >
          <Editor snippet={snippet} onChange={handleSnippetChange} />
          <Preview snippet={snippet} />
        </Splitter>
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
