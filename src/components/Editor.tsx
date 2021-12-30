import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import "@reach/tabs/styles.css";
import debounce from "lodash/debounce";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { IEditorTypes, ISnippet } from "../types";
import { CodeEditor } from "./CodeEditor";

const PREVIEW_DEBOUNCE_MS = 1000;

interface EditorProps {
  snippet: ISnippet;
  onChange: (changedContent: string, changedType: IEditorTypes) => void;
}

export const Editor: React.FC<EditorProps> = ({ snippet, onChange }) => {
  const [htmlCode, setHtmlCode] = useState(snippet.html);
  const [cssCode, setCssCode] = useState(snippet.css);
  const [javascriptCode, setJavascriptCode] = useState(snippet.javascript);

  const debouncedChange = useMemo(
    () =>
      debounce(
        (value: string, type: IEditorTypes) => onChange(value, type),
        PREVIEW_DEBOUNCE_MS
      ),
    [onChange]
  );

  const handleChange = useCallback(
    (value: string | undefined, type: IEditorTypes) => {
      if (value === undefined) {
        return;
      }

      if (type === "html") {
        setHtmlCode(value);
      }

      if (type === "css") {
        setCssCode(value);
      }

      if (type === "javascript") {
        setJavascriptCode(value);
      }

      debouncedChange(value, type);
    },
    [debouncedChange]
  );

  return (
    <Wrapper>
      <StyledTabs>
        <StyledTabList>
          <StyledTab key="html">HTML</StyledTab>
          <StyledTab key="css">CSS</StyledTab>
          <StyledTab key="javascript">JavaScript</StyledTab>
        </StyledTabList>
        <StyledTabPanels>
          <StyledTabPanel key="html">
            <CodeEditor
              title="HTML"
              language="html"
              initialValue={htmlCode}
              onChange={(value) => handleChange(value, "html")}
            />
          </StyledTabPanel>
          <StyledTabPanel key="css">
            <CodeEditor
              title="CSS"
              language="css"
              initialValue={cssCode}
              onChange={(value) => handleChange(value, "css")}
            />
          </StyledTabPanel>
          <StyledTabPanel key="javascript">
            <CodeEditor
              title="JavaScript"
              language="javascript"
              initialValue={javascriptCode}
              onChange={(value) => handleChange(value, "javascript")}
            />
          </StyledTabPanel>
        </StyledTabPanels>
      </StyledTabs>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 100%;
  overflow: hidden; // Helps to keep the editor follow its container size
`;

const StyledTabs = styled(Tabs)`
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px 16px;
`;

const StyledTabList = styled(TabList)`
  display: flex;
  flex-direction: row;
  gap: 16px;
  background-color: transparent;
`;

const StyledTab = styled(Tab)`
  padding: 10px 0 14px;
  border: 0;
  opacity: 0.7;
  transition: opacity 1s var(--timing);

  &:hover {
    opacity: 1;
  }

  &[data-selected] {
    font-weight: var(--font-weight-bold);
    opacity: 1;
  }
`;

const StyledTabPanels = styled(TabPanels)`
  flex: 1 1 0%;
`;

const StyledTabPanel = styled(TabPanel)`
  height: 100%;
`;
