import { useEffect, useMemo, useState } from "react";
import { ISnippet } from "../types";

function constructSnippet(
  { html, css, javascript }: ISnippet,
  transformJs: boolean = false
) {
  function constructJavaScript() {
    if (transformJs) {
      return `
        <script type="module">
          await esbuild.initialize({
            wasmURL: "https://unpkg.com/esbuild-wasm@0.14.6/esbuild.wasm",
          });
          const result = await esbuild.transform(decodeURI(\`${encodeURI(
            javascript
          )}\`));
          const script = document.createElement("script");
          script.type = "module";
          script.innerHTML = result.code;
          document.body.appendChild(script);
        </script>
      `;
    } else {
      return `
        <script>
          ${javascript}
        </script>
      `;
    }
  }

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
      <script>
        var _privateLog = console.log;
        console.log = function(...rest) {
          if (typeof window !== "undefined") {
            window.parent.postMessage({
              source: "playground-frame",
              message: {
                type: "log",
                data: rest,
              },
            }, "*");
          }
          _privateLog.apply(console, arguments);
        }
        window.onerror = function(message) {
          if (typeof window !== "undefined") {
            window.parent.postMessage({
              source: "playground-frame",
              message: {
                type: "error",
                data: message,
              },
            }, "*");
          }
        }
      </script>
      <script src="https://unpkg.com/esbuild-wasm@0.14.6/lib/browser.min.js"></script>
      ${constructJavaScript()}
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
        e.data?.source === "playground-frame" &&
        e.data?.message?.type === "error"
      ) {
        setError(e.data.message.data);
      }
    }

    window.addEventListener("message", handleErrorMessage);

    return () => window.removeEventListener("message", handleErrorMessage);
  }, []);

  return (
    <div className="preview">
      <iframe srcDoc={code} height="100%" width="100%" frameBorder="0" />
      {error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  );
};
