import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "react-feather";
import styled from "styled-components";
import { ISnippet } from "../../types";
import { IconButton } from "../IconButton";
import { Pane } from "../Pane";

function constructSnippet({ html, css, javascript }: ISnippet) {
  javascript = `
    import React from "https://cdn.skypack.dev/react";
    import ReactDOM from "https://cdn.skypack.dev/react-dom";
    import styled, {
      createGlobalStyle,
    } from "https://cdn.skypack.dev/styled-components";
    const render = (value) => {
      const root = document.querySelector("#root");
      if (typeof value === "object") {
        if (value.$$typeof && value.props) {
          ReactDOM.render(value, root);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }
    };
    const _log = console.log;
    console.log = function (...rest) {
      if (typeof window !== "undefined") {
        window.parent.postMessage(
          {
            source: "playground-preview",
            message: {
              type: "log",
              data: rest,
            },
          },
          "*"
        );
      }
      _log.apply(console, arguments);
    };
    window.onerror = function (message) {
      if (typeof window !== "undefined") {
        window.parent.postMessage(
          {
            source: "playground-preview",
            message: {
              type: "error",
              data: message,
            },
          },
          "*"
        );
      }
    };
    ${javascript}
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <title>playground frame</title>
      <style>${css}</style>
    </head>
    <body>
      ${html}
      <script type="module">
        import esbuild from "https://cdn.skypack.dev/esbuild-wasm@0.14.6";
        await esbuild.initialize({
          wasmURL: "https://unpkg.com/esbuild-wasm@0.14.6/esbuild.wasm",
        });
        const result = await esbuild.transform(decodeURI(\`${encodeURI(
          javascript
        )}\`), {
          loader: "jsx",
        });
        const script = document.createElement("script");
        script.type = "module";
        script.innerHTML = result.code;
        document.body.appendChild(script);
      </script>
    </body>
    </html>
  `;
}

interface PreviewProps {
  snippet: ISnippet;
}

export const Preview: React.FC<PreviewProps> = ({ snippet }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [frameKey, setFrameKey] = useState(0);

  useMemo(() => {
    try {
      const code = constructSnippet(snippet);

      setCode(code);
      setError(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [snippet]);

  useEffect(() => {
    function handleErrorMessage(e: MessageEvent) {
      if (
        e.data?.source === "playground-preview" &&
        e.data?.message?.type === "error"
      ) {
        setError(e.data.message.data);
      }
    }

    window.addEventListener("message", handleErrorMessage);

    return () => window.removeEventListener("message", handleErrorMessage);
  }, []);

  return (
    <Wrapper>
      <Pane
        title="Preview"
        actions={
          <IconButton
            icon={<RefreshCw size={21} />}
            text="Refresh"
            onClick={() => {
              // Updating the key will reload the iframe
              setFrameKey(frameKey + 1);
            }}
          />
        }
      >
        <FrameWrapper>
          <Frame
            key={frameKey}
            srcDoc={code}
            height="100%"
            width="100%"
            frameBorder="0"
          />
          {error ? (
            <div className="error">
              <p>{error}</p>
            </div>
          ) : null}
        </FrameWrapper>
      </Pane>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1 1 0%;
  border-top: 1px solid var(--color-header);
`;

const FrameWrapper = styled.div`
  position: relative;
  min-height: 250px;
  max-width: 100%;
  flex: 1;
  overflow: hidden;
  background-color: white;
  border-radius: 4px;
`;

const Frame = styled.iframe`
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;
