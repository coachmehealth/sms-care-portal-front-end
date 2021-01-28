import * as React from 'react';
import styled from 'styled-components';
import { Formik, Field, Form, FieldAttributes } from 'formik';
import { signup } from '../api/userApi';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const FormContainer = styled.div`
  text-align: center;
  margin: 10vh auto;
  width: 40vw;
`;

const Button = styled.button`
  width: 100%;
`;
const FlexContainer = styled.div`
  display: flex;
`;


const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const FieldWrapper = ({
  children,
  icon,
}: {
  children: FieldAttributes<any>;
  icon?: string;
}) => {
  if (!icon) return children;

  return (
    <div className="field">
      <p className="control has-icons-left has-icons-right">
        {children}
        <span className="icon is-small is-left">
          <i className={`fas ${icon}`}></i>
        </span>
      </p>
    </div>
  );
};

const Signup = () => {
  const [signupMutate] = useMutation(signup);
  const history = useHistory();

  const handleSubmit = async (values: IUserSignup) => {
    try {
      await signupMutate(values);
      alert('New Coach Created!');
      document.forms[0].reset();
    } catch (error) {
      alert(`Error: ${error.response.data}`);
    }
  };

  return (
    <FlexContainer>
       <Sidebar />
    
    <FormContainer>
      <h1 className="title is-1">Create New Coach</h1>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <FieldWrapper>
            <Field
              name="firstName"
              className="input"
              type="text"
              placeholder="First Name"
            />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              name="lastName"
              className="input"
              type="text"
              placeholder="Last Name"
            />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              name="email"
              className="input"
              type="email"
              placeholder="Email"
            />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              name="password"
              className="input"
              type="password"
              placeholder="Password"
            />
          </FieldWrapper>
          <Button className="button is-primary" type="submit">
            Create Account
          </Button>
        </Form>
      </Formik>
    </FormContainer>
    </FlexContainer>
  );
};

export default Signup;
