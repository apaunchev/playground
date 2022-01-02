import { ISnippet } from "../types";

export const constructIframeCode = ({ html, css, javascript }: ISnippet) => {
  javascript = `
    import React from "https://cdn.skypack.dev/react";
    import ReactDOM from "https://cdn.skypack.dev/react-dom";
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
    ${javascript}
  `;

  css = `
    *, *::before, *::after {
      box-sizing: border-box;
    }
    * {
      margin: 0;
    }
    html, body {
      height: 100%;
    }
    body {
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    img, picture, video, canvas, svg {
      display: block;
      max-width: 100%;
    }
    input, button, textarea, select {
      font: inherit;
    }
    p, h1, h2, h3, h4, h5, h6 {
      overflow-wrap: break-word;
    }
    #root {
      isolation: isolate;
    }
    ${css}
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
};
