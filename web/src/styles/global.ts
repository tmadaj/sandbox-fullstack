import { createGlobalStyle } from 'styled-components';
import theme from 'styles/themeProxy';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #root {
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-size: 18px;
    font-family: 'Muli', sans-serif;
    background: ${theme.swatches.primaryBg};
    color: ${theme.swatches.primaryReadable};
  }

  li {
    list-style: none;
  }

  h1 {
    font-size: 1.5rem;
    line-height: 1.875rem;
    letter-spacing: 0.0125rem;
    text-transform: capitalize;
    color: ${theme.swatches.headlines};
  }

  h2 {
    font-size: 1.25rem;
    line-height: 1.5625rem;
    letter-spacing: 0.0125rem;
    text-transform: capitalize;
    color: ${theme.swatches.headlines};
  }

  h3 {
    font-size: 1.125;
    line-height: 1.25rem;
    letter-spacing: 0.05rem;
    font-weight: 400;
    text-transform: uppercase;
    color: ${theme.swatches.headlines};
  }

  h4 {
    font-size: 1rem;
    line-height: 1.25rem;
    letter-spacing: 0.05rem;
    font-weight: 600;
    text-transform: uppercase;
    color: ${theme.swatches.headlines};
  }

  p {
    font-size: 1rem;
    line-height: 1.25rem;
    letter-spacing: 0.0125rem;
    font-weight: 400;
    text-transform: none;
  }

  a {
    font-size: 1rem;
    line-height: 1.25rem;
    letter-spacing: 0.0125rem;
    font-weight: 400;
    text-transform: none;
    color: ${theme.swatches.links};
  }

  input,
  select {
    font-size: 1rem;
    font-family: 'Muli', sans-serif;
    background: ${theme.swatches.primaryBg};
    color: ${theme.swatches.primaryReadable};
    padding: 0.15rem 0.35rem;
  }
`;
