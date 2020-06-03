import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getOne as getRestaurant } from 'api/restaurant';
import { getAll as getReviews } from 'api/review';
import handleApiError from 'utils/handleApiError';
import Inner from 'components/Inner';
import Header from 'components/Header';
import Throbber from 'components/Throbber';
import Details from './Details';
import Reviews from './Reviews';

interface Props {
  match: { params: { id: string } };
}

async function fetchRestaurant(id): Promise<AxiosResponse> {
  try {
    const response = await getRestaurant(id);

    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function fetchReviews(params): Promise<AxiosResponse> {
  try {
    const response = await getReviews(params);

    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}
export default function RestautantDetail({
  match: {
    params: { restaurantId },
  },
}: Props): React.ReactNode {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchRestaurant(restaurantId)
      .then(setData)
      .catch((err) => handleApiError(err, history));
    fetchReviews({ restaurantId })
      .then(setReviews)
      .catch((err) => handleApiError(err, history));
  }, [restaurantId, history]);

  return (
    <>
      <Header title={`Details of ${data?.name}` || 'Restaurant'} backPath="/restaurants" />
      <Inner>
        {data ? <Details data={data} /> : <Throbber />}
        {reviews ? <Reviews data={reviews} restaurantId={restaurantId} /> : <Throbber />}
      </Inner>
    </>
  );
}
