import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { getUserConfig } from 'src/redux/selectors';

interface Props {
  component: React.FC;
  children: React.ReactNode;
}

export default function PrivateRoute({
  restrictRole,
  component: Component,
  children,
  ...rest
}: Props): React.ReactElement {
  const { accessToken, role } = useSelector(getUserConfig, shallowEqual);

  function renderRoute({ location, ...restInner }: { location: string }): React.ReactNode {
    return accessToken && (!restrictRole || role === restrictRole) ? (
      <Component {...restInner} /> || children
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    );
  }

  return <Route {...rest} render={renderRoute} />;
}
