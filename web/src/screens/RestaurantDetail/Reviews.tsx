import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { getUserConfig } from 'src/redux/selectors';
import ReviewList from 'components/ReviewList';
import NewReview from 'components/NewReview';

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
  restaurantId: string;
}

const Section = styled.section`
  width: 100%;
  margin: 1rem 0;
`;

function getBestReview(reviews): Review[] {
  return reviews.reduce((a, b) => (a.rating > b.rating ? a : b));
}

function getWorstReview(reviews): Review[] {
  return reviews.reduce((a, b) => (a.rating < b.rating ? a : b));
}

function getLatestReviews(reviews): Review[] {
  return [...reviews].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export default function Reviews({ data, restaurantId }: Props): React.ReactNode {
  const { role } = useSelector(getUserConfig, shallowEqual);

  return (
    <>
      {role === 'regular' && (
        <Section>
          <NewReview restaurantId={restaurantId} />
        </Section>
      )}
      {data.length ? (
        <>
          <Section>
            <h4>Best Review:</h4>
            <ReviewList data={[getBestReview(data)]} />
          </Section>
          <Section>
            <h4>Worst Review:</h4>
            <ReviewList data={[getWorstReview(data)]} />
          </Section>
          <Section>
            <h4>Latest Reviews:</h4>
            <ReviewList data={getLatestReviews(data)} />
          </Section>
        </>
      ) : (
        'No reviews'
      )}
    </>
  );
}
