import React from 'react';
import styled from 'styled-components';
import RatingDisplay from 'components/RatingDisplay';

interface Props {
  data: [
    {
      _id: string;
      name: string;
      ownerId: string;
      rating: number;
    },
  ];
}

const Section = styled.section`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
`;

export default function Details({ data: { name, rating } }: Props): React.ReactNode {
  return (
    <Section>
      <h1>{name}</h1>
      <h3>
        Average rating: <RatingDisplay rating={rating} />
      </h3>
    </Section>
  );
}
