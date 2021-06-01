import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../api/core/auth";
import AppContainer from "../AppContainer";
import { logOutIfInactive } from "./inactivityUtils";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  logOutIfInactive();
  const condition = auth.isAuthenticated();
  localStorage.setItem("lastActivityDate", new Date().toDateString());

  return condition ? (
    <AppContainer>
      <Route
        path={props.path}
        exact={props.exact}
        component={props.component}
      />
    </AppContainer>
  ) : (
    <Redirect to="/login" />
  );
};
export default PrivateRoute;
