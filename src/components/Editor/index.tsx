import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { IEditorTypes, ISnippet } from "../../types";
import { CodeEditor } from "../CodeEditor";

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
    (value: string | undefined, type: IEditorTypes) => {
      if (!value) {
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
      <SplitPaneWrapper>
        <SplitPane>
          <CodeEditor
            title="HTML"
            language="html"
            initialValue={htmlCode}
            onChange={(value) => handleChange(value, "html")}
          />
        </SplitPane>
        <SplitPane>
          <CodeEditor
            title="CSS"
            language="css"
            initialValue={cssCode}
            onChange={(value) => handleChange(value, "css")}
          />
        </SplitPane>
        <SplitPane>
          <CodeEditor
            title="JSX"
            language="javascript"
            initialValue={javascriptCode}
            onChange={(value) => handleChange(value, "javascript")}
          />
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
