import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Viewport = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export default function Layout({ children }: Props): React.ReactNode {
  // Place for global overlay components, nav, sidebars, modals, notifications, etc.
  return <Viewport>{children}</Viewport>;
}
