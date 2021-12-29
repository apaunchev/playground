import MonacoEditor, { OnChange } from "@monaco-editor/react";
import styled from "styled-components";

interface CodeEditorProps {
  title: string;
  language: string;
  initialValue: string;
  onChange: OnChange;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  initialValue,
  onChange,
}) => {
  return (
    <EditorWrapper>
      <MonacoEditor
        theme="vs-dark"
        language={language}
        options={{
          wordWrap: "on",
          lineNumbers: "off",
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          scrollBeyondLastLine: false,
          overviewRulerBorder: false,
          overviewRulerLanes: 0,
          renderLineHighlight: "none",
        }}
        value={initialValue}
        onChange={onChange}
      />
    </EditorWrapper>
  );
};

const EditorWrapper = styled.div`
  height: 100%;
`;
