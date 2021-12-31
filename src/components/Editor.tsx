import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import "@reach/tabs/styles.css";
import debounce from "lodash/debounce";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { IEditorTypes, ISnippet } from "../types";
import { CodeEditor } from "./CodeEditor";

const previewDebounceTiming = 1000; // ms
const tabs: { type: IEditorTypes; title: string }[] = [
  { type: "html", title: "HTML" },
  { type: "css", title: "CSS" },
  { type: "javascript", title: "JavaScript" },
];

interface EditorProps {
  snippet: ISnippet;
  onChange: (value: string | undefined, type: IEditorTypes) => void;
}

export const Editor: React.FC<EditorProps> = ({ snippet, onChange }) => {
  const handleChange = (value: string | undefined, type: IEditorTypes) =>
    onChange(value, type);

  const handleChangeDebounced = useMemo(
    () => debounce(handleChange, previewDebounceTiming),
    [onChange]
  );

  useEffect(() => {
    return () => handleChangeDebounced.cancel();
  }, []);

  return (
    <Wrapper>
      <StyledTabs>
        <StyledTabList>
          {tabs.map(({ type, title }) => (
            <StyledTab key={type}>{title}</StyledTab>
          ))}
        </StyledTabList>
        <StyledTabPanels>
          {tabs.map(({ type, title }) => (
            <StyledTabPanel key={type}>
              <CodeEditor
                title={title}
                language={type}
                value={snippet[type]}
                onChange={(value) => handleChangeDebounced(value, type)}
              />
            </StyledTabPanel>
          ))}
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
