import React from 'react';
import styled from 'styled-components';
import theme from 'styles/themeProxy';

interface Props {
  type: string;
  message: string;
}

const Container = styled.div`
  display: block;
  width: 100%;
  min-height: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border: 0.1rem solid ${({ type }) => theme.swatches[type]};
  color: ${({ type }) => theme.swatches[type]};
`;

export default function Message({ type, message }: Props): React.ReactElement {
  return <Container type={type}>{message}</Container>;
}
