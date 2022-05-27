import { useRef } from "react";
import MonacoEditor, { OnChange } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import "./code-editor.css";

interface CodeEditorProps {
  initalValue: string;
  onChange(value: string | undefined): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initalValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const onEditorChange: OnChange = (value: string | undefined, ev) => {
    onChange(value);
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onChange={onEditorChange}
        onMount={onEditorDidMount}
        value={initalValue}
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
