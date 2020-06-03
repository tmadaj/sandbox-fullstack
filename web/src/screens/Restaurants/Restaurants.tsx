import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { getUserConfig } from 'src/redux/selectors';
import { getAll as getRestaurants } from 'api/restaurant';
import { getAll as getReviews } from 'api/review';
import handleApiError from 'utils/handleApiError';
import Inner from 'components/Inner';
import Header from 'components/Header';
import Throbber from 'components/Throbber';
import RestautantList from 'components/RestaurantList';
import ReviewList from 'components/ReviewList';

const H2 = styled.h2`
  margin-top: 2rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0.5rem 0;
`;

const Filter = styled.label`
  display: flex;
  align-items: center;
  margin-right: 2rem;

  input {
    margin: 0 1rem;
  }
`;

const StyledLink = styled(Link)`
  margin-left: auto;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

async function fetchRestaurants(params): Promise<Log> {
  try {
    const response = await getRestaurants(params);

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function fetchPendingReviews(): Promise<Log> {
  try {
    const response = await getReviews({ pendingReply: 1 });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default function Restautants(): React.ReactNode {
  const history = useHistory();
  const { role } = useSelector(getUserConfig, shallowEqual);
  const [restaurantsData, setRestaurantsData] = useState(null);
  const [pendingReviews, setPendingReviews] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [own, setOwn] = useState(role === 'owner');

  function handleMinRatingChange({ target: { value } }): void {
    setMinRating(value);
  }

  function handleOwnChange({ target: { checked } }): void {
    setOwn(checked);
  }

  useEffect(() => {
    if (role === 'owner') {
      fetchPendingReviews()
        .then(setPendingReviews)
        .catch((err) => handleApiError(err, history));
    }
  }, [role, history]);

  useEffect(() => {
    const t = setTimeout(() => {
      fetchRestaurants({ minRating, own: own ? 1 : 0 })
        .then(setRestaurantsData)
        .catch((err) => handleApiError(err, history));
    }, 100);

    return () => clearTimeout(t);
  }, [minRating, own, history]);

  return (
    <>
      <Header title="Restautants" />
      <Inner>
        {role === 'owner' && pendingReviews && (
          <>
            <H2>Reviews pending reply:</H2>
            <ReviewList data={pendingReviews} />
          </>
        )}
        <H2>All restaurants:</H2>
        <Row>
          <Filter htmlFor="minRating">
            Minimal Rating:
            <input
              id="minRating"
              type="range"
              min={0}
              max={5}
              value={minRating}
              step={0.1}
              onChange={handleMinRatingChange}
            />
            {`${minRating} \u2605`}
          </Filter>
          {role === 'owner' && (
            <>
              <Filter htmlFor="own">
                Owned by me:
                <input id="own" type="checkbox" checked={own} onChange={handleOwnChange} />
              </Filter>
              <StyledLink to="/restaurant/new">New restaurant</StyledLink>
            </>
          )}
        </Row>
        {restaurantsData ? <RestautantList data={restaurantsData} /> : <Throbber />}
      </Inner>
    </>
  );
}
