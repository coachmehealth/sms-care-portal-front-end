import React from 'react';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import MessageTemplatePage from './MessageTemplates'
import PatientDashboard from './PatientDashboard';
import PatientRecords from './PatientRecords';
import AddPatientForm from '../components/AddPatientForm';
import MessageTemplateForm from '../components/MessageTemplateForm';
import AppContainer from '../components/AppContainer';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Router>
        <Switch>
          <PrivateRoute exact path="/signup" component={Signup} />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/patient_add" component={AddPatientForm} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/patients" component={PatientDashboard}/>
          <PrivateRoute exact path="/patient/:id" component={PatientRecords}/>
          <PrivateRoute exact path="/messageTemplate" component={MessageTemplatePage}/>
          <PublicRoute exact={false} path="/" component={Login} />
        </Switch>
    </Router>
  );
};

export default AppRouter;
