import React from 'react';
import styled from 'styled-components';
import theme from 'styles/themeProxy';
import moment from 'moment';
import RatingDisplay from 'components/RatingDisplay';
import Reply from './Reply';

interface Props {
  data: {
    _id: string;
    rating: number;
    comment?: string;
    reply?: string;
    date: string;
  };
}

const Box = styled.li`
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: left;
  border: 0.05rem solid ${theme.swatches.primaryReadable};
  margin: 1rem 0;
  padding: 1rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export default function Review({
  data: { _id, rating, comment, reply, date },
}: Props): React.ReactElement {
  return (
    <Box>
      <Row>
        <div>
          Rating: <RatingDisplay rating={rating} />
        </div>
        <div>{moment(date).format('MMMM Do YYYY, H:mm')}</div>
      </Row>
      <div>{`"${comment}"` || <i>User left only rating</i>}</div>
      <Reply data={reply} reviewId={_id} />
    </Box>
  );
}
