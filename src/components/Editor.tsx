import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import "@reach/tabs/styles.css";
import debounce from "lodash/debounce";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { IEditorTypes, ISnippet } from "../types";
import { CodeEditor } from "./CodeEditor";

const PREVIEW_DEBOUNCE_MS = 1000;

interface EditorProps {
  snippet: ISnippet;
  onChange: (value: string, type: IEditorTypes) => void;
}

export const Editor: React.FC<EditorProps> = ({ snippet, onChange }) => {
  const handleChange = (value: string | undefined, type: IEditorTypes) => {
    if (value !== undefined) {
      onChange(value, type);
    }
  };

  const handleChangeDebounced = useMemo(
    () => debounce(handleChange, PREVIEW_DEBOUNCE_MS),
    [onChange]
  );

  useEffect(() => {
    return () => handleChangeDebounced.cancel();
  }, []);

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
              value={snippet.html}
              onChange={(value) => handleChangeDebounced(value, "html")}
            />
          </StyledTabPanel>
          <StyledTabPanel key="css">
            <CodeEditor
              title="CSS"
              language="css"
              value={snippet.css}
              onChange={(value) => handleChangeDebounced(value, "css")}
            />
          </StyledTabPanel>
          <StyledTabPanel key="javascript">
            <CodeEditor
              title="JavaScript"
              language="javascript"
              value={snippet.javascript}
              onChange={(value) => handleChangeDebounced(value, "javascript")}
            />
          </StyledTabPanel>
        </StyledTabPanels>
      </StyledTabs>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
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
  font-weight: var(--font-weight-medium);
  opacity: 0.7;
  transition: opacity 1s var(--timing);

  &:hover {
    opacity: 1;
  }

  &[data-selected] {
    opacity: 1;
  }
`;

const StyledTabPanels = styled(TabPanels)`
  flex: 1 1 0%;
`;

const StyledTabPanel = styled(TabPanel)`
  height: 100%;
`;
