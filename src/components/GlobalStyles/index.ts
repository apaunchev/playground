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
    color: var(--color-text-primary);
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
    --font-weight-medium: 500;
    --font-weight-light: 300;

    --color-background: hsl(226deg 19% 13%);
    --color-text-primary: hsl(231deg 28% 73%);
    --color-border-primary: hsl(231deg 28% 73%);

    --timing: cubic-bezier(0.19, 1, 0.22, 1);
  }
`;
