import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /*
    Josh's Custom CSS Reset
    https://www.joshwcomeau.com/css/custom-css-reset/
  */
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
    font-family: var(--font-family);
    color: var(--color-text);
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

  // Variables
  :root {
    --font-family: system-ui, sans-serif;
    --font-family-mono: monospace;

    --font-weight-bold: 700;
    --font-weight-medium: 600;
    --font-weight-normal: 400;

    --color-background: #1e1e1e;
    --color-header: #333;
    --color-text: #ccc;

    --timing: cubic-bezier(0.19, 1, 0.22, 1);
  }

  // @devbookhq/splitter overrides
  .__dbk__gutter.Dark {
    background-color: var(--color-header);

    > .__dbk__dragger {
      background-color: var(--color-text);
      opacity: 0.7;
      transition: opacity 1s var(--timing);
    }

    &:hover {
      > .__dbk__dragger {
        background-color: var(--color-text);
        opacity: 1;
      }
    }
  }
`;
