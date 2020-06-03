import React from 'react';
import styled from 'styled-components';

interface Props {
  rating?: number;
}

const Stars = styled.div`
  display: inline-block;
`;

export default function RatingDisplay({ rating }: Props): React.ReactElement {
  return <Stars>{rating ? `${rating.toFixed(1)} \u2605` : 'Not rated yet'}</Stars>;
}
