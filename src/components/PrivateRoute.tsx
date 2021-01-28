import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../api/core/auth';
import AppContainer from './AppContainer';

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const condition = auth.isAuthenticated();

  return condition ? (
    <AppContainer>
      <Route path={props.path} exact={props.exact} component={props.component} />
    </AppContainer>
  ) : (
    <Redirect to="/login" />
  );
};
export default PrivateRoute;
