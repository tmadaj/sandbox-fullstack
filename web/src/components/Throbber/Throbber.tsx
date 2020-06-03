import React from 'react';
import styled from 'styled-components';

const CenteringContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Throbber(): React.ReactElement {
  return (
    <CenteringContainer>
      <h4>Loading ...</h4>
    </CenteringContainer>
  );
}
