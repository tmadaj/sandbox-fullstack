import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { mostReadable } from 'tinycolor2';
import { getTheme } from 'src/redux/selectors';
import palette from './palette';
import defaultSwatches from './swatches';

interface Props {
  children: React.ReactNode;
}

const bw = [palette.black, palette.gray50];

function getReadable(bg: string): string {
  return mostReadable(bg, bw).toHexString();
}

export default function ThemeP({ children }: Props): React.Provider {
  const activeTheme = useSelector(getTheme, shallowEqual);
  const activeSwatches = defaultSwatches[activeTheme];
  const readableSwatches = {
    primaryReadable: getReadable(activeSwatches.primaryBg),
    secondaryReadable: getReadable(activeSwatches.secondaryBg),
    accentReadable: getReadable(activeSwatches.accent),
  };
  const swatches = { ...activeSwatches, ...readableSwatches };

  return <ThemeProvider theme={{ palette, swatches }}>{children}</ThemeProvider>;
}
