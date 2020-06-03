import React, { Props } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/themeProxy';
import { setTheme, logout as actionLogout } from 'src/redux/actions';
import { getTheme, getUserConfig } from 'src/redux/selectors';
import Inner from 'components/Inner';
import Button from 'components/Button';

interface Props {
  title: string;
  backPath: string;
  buttons: React.ReactElement[];
}

const Wrapper = styled.header`
  background: ${theme.swatches.primaryBg};
  border-bottom: 0.05rem solid ${theme.palette.gray30};
  position: sticky;
  top: 0;
  margin-bottom: 1rem;
`;

const Row = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
`;

const Back = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  margin-right: 1rem;
`;

const Headline = styled.h2`
  margin: 0;
`;

const UserName = styled.div`
  margin-left: auto;
`;

const RightButton = styled(Button)`
  margin-left: auto;
`;

export default function Header({ title, backPath, children }: Props): React.ReactElement {
  const history = useHistory();
  const userConfig: string = useSelector(getUserConfig, shallowEqual);
  const activeTheme: Theme = useSelector(getTheme, shallowEqual);
  const reverseTheme = activeTheme === 'light' ? 'dark' : 'light';

  function login(): void {
    history.push('/login');
  }

  function register(): void {
    history.push('/register');
  }

  function logout(): void {
    actionLogout();
  }

  function toggleTheme(): void {
    setTheme(reverseTheme);
  }

  return (
    <Wrapper>
      <Inner>
        <Row>
          {backPath && <Back to={backPath}>&#129120;</Back>}
          <Headline>{title}</Headline>
          {children}
          {userConfig.accessToken ? (
            <>
              <UserName>Logged in as {userConfig.displayName}</UserName>
              <Button onClick={logout}>Log Out</Button>
            </>
          ) : (
            <>
              <RightButton onClick={login}>Log In</RightButton>
              <Button onClick={register}>Register</Button>
            </>
          )}
          <Button onClick={toggleTheme}>{reverseTheme} theme</Button>
        </Row>
      </Inner>
    </Wrapper>
  );
}
