import React from 'react';
import styled from 'styled-components';
import Review from './Review';

interface Props {
  data: [
    {
      _id: string;
      rating: number;
      comment?: string;
      reply?: string;
      date: string;
    },
  ];
}

const List = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: stretch;
`;

export default function ReviewList({ data }: Props): React.ReactElement {
  return (
    <List>
      {data.map((review) => (
        <Review key={review._id} data={review} />
      ))}
    </List>
  );
}
