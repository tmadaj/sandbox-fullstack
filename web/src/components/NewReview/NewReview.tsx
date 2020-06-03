import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { add } from 'api/review';

interface Props {
  restaurantId: string;
}

const H4 = styled.h4`
  margin: 2rem 0 1rem;
`;

const ReviewForm = styled.form`
  margin: 0 0 2rem;
  display: flex;
  width: 100%;
  align-items: center;

  input[type='text'] {
    flex: 1 1 auto;
    margin: 0 1rem;
  }
`;

const Star = styled.span`
  display: block;
  margin-left: 0.25rem;
  line-height: 1;
  font-size: 1.33rem;
`;

async function sendReview(data): Promise<void> {
  try {
    const response = await add(data);

    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export default function NewReview({ restaurantId }: Props): React.ReactNode {
  const history = useHistory();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewed, setReviewed] = useState(false);

  async function handleSubmit(event): Promise<> {
    sendReview({ restaurantId, rating, comment })
      .then(() => setReviewed(true))
      .catch((err) => handleApiError(err, history));
    event.preventDefault();
  }

  function handleRatingChange({ target: { value } }): void {
    setRating(value);
  }

  function handleCommentChange({ target: { value } }): void {
    setComment(value);
  }

  return reviewed ? (
    'Your review was succesfully posted.'
  ) : (
    <>
      <H4>Write your review</H4>
      <ReviewForm onSubmit={handleSubmit}>
        <select value={rating} onChange={handleRatingChange}>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
        <Star>&#x2605;</Star>
        <input
          type="text"
          placeholder="Write your review"
          value={comment}
          onChange={handleCommentChange}
        />
        <input type="submit" value="Send" />
      </ReviewForm>
    </>
  );
}
