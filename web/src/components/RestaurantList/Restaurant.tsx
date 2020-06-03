import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from 'styles/themeProxy';
import RatingDisplay from 'components/RatingDisplay';

interface Props {
  data: {
    name: string;
    rating?: number;
    _id: string;
  };
}

const Tile = styled.li`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  border: 0.05rem solid ${theme.swatches.primaryReadable};
  margin: 1rem 0;

  &:hover {
    background: ${theme.swatches.secondaryBg};
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
`;

export default function Restaurant({ data: { _id, name, rating } }: Props): React.ReactElement {
  return (
    <Tile>
      <StyledLink to={`restaurant/${_id}`}>
        {name}
        <RatingDisplay rating={rating} />
      </StyledLink>
    </Tile>
  );
}
