import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, shallowEqual } from 'react-redux';
import { getUserConfig } from 'src/redux/selectors';
import { addReply } from 'api/review';
import handleApiError from 'utils/handleApiError';

interface Props {
  data: string;
  reviewId: string;
}

const Box = styled.div`
  margin: 1rem 0 0 1rem;
`;

const ReplyForm = styled.form`
  margin: 1rem 0 0 1rem;

  input {
    width: 100%;
  }
`;

async function sendReply(reviewId, data): Promise<Log> {
  try {
    const response = await addReply(reviewId, data);

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default function Reply({ data, reviewId }: Props): React.ReactNode {
  const history = useHistory();
  const { role } = useSelector(getUserConfig, shallowEqual);
  const [reply, setReply] = useState(data);
  const [newReply, setNewReply] = useState('');

  async function handleSubmit(event): Promise<> {
    sendReply(reviewId, { reply: newReply })
      .then(({ reply: sentReply }) => setReply(sentReply))
      .catch((err) => handleApiError(err, history));
    event.preventDefault();
  }

  function handleChange({ target: { value } }): void {
    setNewReply(value);
  }

  return reply ? (
    <Box>
      <i>Owner&apos;s reply:</i>
      <div>{`"${reply}"`}</div>
    </Box>
  ) : (
    role === 'owner' && (
      <ReplyForm onSubmit={handleSubmit}>
        <input type="text" placeholder="Write a reply" value={newReply} onChange={handleChange} />
      </ReplyForm>
    )
  );
}
