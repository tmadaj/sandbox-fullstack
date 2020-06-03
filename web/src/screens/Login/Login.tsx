import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { login as actionLogin } from 'src/redux/actions';
import { getUserConfig } from 'src/redux/selectors';
import { login as apiLogin } from 'api/user';
import Inner from 'components/Inner';
import Header from 'components/Header';
import Message from 'components/Message';

const StyledForm = styled.form`
  max-width: 22rem;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 0.75rem;
    height: 1.75rem;
  }
`;

async function login(data): Promise<void> {
  try {
    const response = await apiLogin(data);

    return response.data;
  } catch (err) {
    return Promise.reject(err.response);
  }
}

export default function Login(): React.ReactNode {
  const history = useHistory();
  const { accessToken, displayName } = useSelector(getUserConfig, shallowEqual);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let timeout = 0;

    if (accessToken) {
      timeout = setTimeout(() => history.push('/restaurants'), 1000);
    }

    return () => clearTimeout(timeout);
  }, [accessToken, history]);

  function handleEmailChange({ target: { value } }): void {
    setEmail(value);
  }

  function handlePwdChange({ target: { value } }): void {
    setPassword(value);
  }

  function handleSubmit(event): Promise<> {
    setError('');
    login({ email, password })
      .then(actionLogin)
      .catch(({ data }) => setError(data));
    event.preventDefault();
  }

  return (
    <>
      <Header title="Login" />
      <Inner>
        {accessToken ? (
          <Message type="success" message={`Logged in as ${displayName}, redirecting ...`} />
        ) : (
          <StyledForm onSubmit={handleSubmit}>
            <input placeholder="email" value={email} onChange={handleEmailChange} />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={handlePwdChange}
            />
            <input type="submit" value="Log In" />
          </StyledForm>
        )}
        {error && <Message type="error" message={error} />}
      </Inner>
    </>
  );
}
