import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { add } from 'api/restaurant';
import Inner from 'components/Inner';
import Header from 'components/Header';
import Message from 'components/Message';

const Title = styled.h3`
  margin: 2rem 0 1rem;
`;

const ReviewForm = styled.form`
  margin: 0 0 2rem;
  display: flex;
  width: 100%;
  align-items: center;

  input {
    margin-right: 1rem;
  }
`;

async function sendRestaurant(data): Promise<void> {
  try {
    const response = await add(data);

    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export default function NewRestaurant(): React.ReactNode {
  const history = useHistory();
  const [name, setName] = useState('');
  const [created, setCreated] = useState(false);

  async function handleSubmit(event): Promise<> {
    sendRestaurant({ name })
      .then(() => {
        setCreated(true);
        setTimeout(() => history.push('/restaurants'), 1500);
      })
      .catch((err) => handleApiError(err, history));
    event.preventDefault();
  }

  function handleNameChange({ target: { value } }): void {
    setName(value);
  }
  return (
    <>
      <Header title="Register" />
      <Inner>
        <Title>Create a new restaurant</Title>
        {created ? (
          <Message type="success" message={`Restaurant ${name} was created, redirecting ...`} />
        ) : (
          <ReviewForm onSubmit={handleSubmit}>
            <input placeholder="Restaurant's name" value={name} onChange={handleNameChange} />
            <input type="submit" value="Create" />
          </ReviewForm>
        )}
      </Inner>
    </>
  );
}
