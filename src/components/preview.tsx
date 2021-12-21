import { useEffect, useMemo, useState } from "react";
import { ISnippet } from "../types";

function constructSnippet({ html, css, javascript }: ISnippet) {
  function constructJavaScript() {
    return `
      <script type="module">
        import esbuild from 'https://cdn.skypack.dev/esbuild-wasm@0.14.6';
        await esbuild.initialize({
          wasmURL: "/esbuild.wasm",
        });
        const result = await esbuild.transform(decodeURI(\`${encodeURI(
          javascript
        )}\`), {
          loader: "jsx"
        });
        const script = document.createElement("script");
        script.type = "module";
        script.innerHTML = result.code;
        document.body.appendChild(script);
      </script>
    `;
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
        var _log = console.log;
        console.log = function(...rest) {
          if (typeof window !== "undefined") {
            window.parent.postMessage({
              source: "playground-preview",
              message: {
                type: "log",
                data: rest,
              },
            }, "*");
          }
          _log.apply(console, arguments);
        }
        window.onerror = function(message) {
          if (typeof window !== "undefined") {
            window.parent.postMessage({
              source: "playground-preview",
              message: {
                type: "error",
                data: message,
              },
            }, "*");
          }
        }
      </script>
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
