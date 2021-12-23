import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { IEditorTypes, ISnippet } from "../../types";
import { Pane } from "../Pane";

const PREVIEW_DEBOUNCE_MS = 1000;

interface EditorProps {
  snippet: ISnippet;
  onChange: (changedContent: string, changedType: IEditorTypes) => void;
}

export const Editor: React.FC<EditorProps> = ({ snippet, onChange }) => {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [javascriptCode, setJavascriptCode] = useState("");

  useEffect(() => {
    if (snippet.html) {
      setHtmlCode(snippet.html);
    }

    if (snippet.css) {
      setCssCode(snippet.css);
    }

    if (snippet.javascript) {
      setJavascriptCode(snippet.javascript);
    }
  }, []);

  const debouncedChange = useMemo(
    () =>
      debounce(
        (value: string, type: IEditorTypes) => onChange(value, type),
        PREVIEW_DEBOUNCE_MS
      ),
    [onChange]
  );

  const handleChange = useCallback(
    (value: string, type: IEditorTypes) => {
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
      <SplitPaneWrapper>
        <SplitPane>
          <Pane title="HTML">
            <EditorWrapper>
              <textarea
                value={htmlCode}
                onChange={(e) => handleChange(e.target.value, "html")}
              ></textarea>
            </EditorWrapper>
          </Pane>
        </SplitPane>
        <SplitPane>
          <Pane title="CSS">
            <EditorWrapper>
              <textarea
                value={cssCode}
                onChange={(e) => handleChange(e.target.value, "css")}
              ></textarea>
            </EditorWrapper>
          </Pane>
        </SplitPane>
        <SplitPane>
          <Pane title="JSX">
            <EditorWrapper>
              <textarea
                value={javascriptCode}
                onChange={(e) => handleChange(e.target.value, "javascript")}
              ></textarea>
            </EditorWrapper>
          </Pane>
        </SplitPane>
      </SplitPaneWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1 1 0%;
`;

const SplitPaneWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const SplitPane = styled.div`
  flex: 1 1 0%;
`;

const EditorWrapper = styled.div``;
