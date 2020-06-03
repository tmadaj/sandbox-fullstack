import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
// import { login as actionLogin } from 'src/redux/actions';
import { register as apiRegister } from 'api/user';
import Inner from 'components/Inner';
import Header from 'components/Header';
import Message from 'components/Message';

const StyledForm = styled.form`
  max-width: 22rem;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;

  input,
  select {
    margin-bottom: 0.75rem;
    height: 1.75rem;
  }
`;

async function register(data): Promise<void> {
  try {
    const response = await apiRegister(data);

    return response.data;
  } catch (err) {
    return Promise.reject(err.response);
  }
}

export default function Register(): React.ReactNode {
  const history = useHistory();
  const [name, setName] = useState('');
  const [role, setRole] = useState('regular');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  function handleNameChange({ target: { value } }): void {
    setName(value);
  }

  function handleRoleChange({ target: { value } }): void {
    setRole(value);
  }

  function handleEmailChange({ target: { value } }): void {
    setEmail(value);
  }

  function handlePwdChange({ target: { value } }): void {
    setPassword(value);
  }

  async function handleSubmit(event): Promise<> {
    register({ name, role, email, password })
      .then((data) => {
        setSuccess(`Account ${data.name} created`);
        setTimeout(() => history.push('/login'), 1500);
      })
      .catch(({ data }) => setError(data));
    event.preventDefault();
  }

  return (
    <>
      <Header title="Register" />
      <Inner>
        {success ? (
          <Message type="success" message={success} />
        ) : (
          <StyledForm onSubmit={handleSubmit}>
            <input placeholder="name" value={name} onChange={handleNameChange} />
            <select value={role} onChange={handleRoleChange}>
              <option value="regular">Regular</option>
              <option value="owner">Owner</option>
              {/* <option value="admin">Admin</option> */}
            </select>
            <input placeholder="email" value={email} onChange={handleEmailChange} />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={handlePwdChange}
            />
            <input type="submit" value="Register" />
          </StyledForm>
        )}
        {error && <Message type="error" message={error} />}
      </Inner>
    </>
  );
}
