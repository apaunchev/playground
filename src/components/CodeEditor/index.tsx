import MonacoEditor, { OnChange, OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import babelParser from "prettier/parser-babel";
import htmlParser from "prettier/parser-html";
import cssParser from "prettier/parser-postcss";
import { useRef } from "react";
import { Zap } from "react-feather";
import styled from "styled-components";
import { IconButton } from "../IconButton";
import { Pane } from "../Pane";

interface CodeEditorProps {
  title: string;
  language: string;
  initialValue: string;
  onChange: OnChange;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  title,
  language,
  initialValue,
  onChange,
}) => {
  const editorRef = useRef<any>();

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleFormatClick = () => {
    let parser, plugins;

    if (language === "html") {
      parser = "html";
      plugins = [htmlParser];
    } else if (language === "css") {
      parser = "css";
      plugins = [cssParser];
    } else if (language === "javascript") {
      parser = "babel";
      plugins = [babelParser];
    }

    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier
      .format(unformatted, {
        parser,
        plugins,
        useTabs: false,
        semi: true,
      })
      .replace(/\n$/, "");

    editorRef.current.setValue(formatted);
  };

  return (
    <Pane
      title={title}
      actions={
        <IconButton
          icon={<Zap size={21} />}
          text="Format"
          onClick={handleFormatClick}
        />
      }
    >
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
          }}
          value={initialValue}
          onMount={handleEditorMount}
          onChange={onChange}
        />
      </EditorWrapper>
    </Pane>
  );
};

const EditorWrapper = styled.div`
  height: 100%;
`;
