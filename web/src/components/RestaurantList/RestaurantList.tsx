import React from 'react';
import styled from 'styled-components';
import Restaurant from './Restaurant';

interface Props {
  data: [
    {
      name: string;
      rating: string;
      _id: string;
    },
  ];
}

const List = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: stretch;
`;

export default function Throbber({ data }: Props): React.ReactElement {
  return (
    <List>
      {data.map((restaurant) => (
        <Restaurant key={restaurant._id} data={restaurant} />
      ))}
    </List>
  );
}
