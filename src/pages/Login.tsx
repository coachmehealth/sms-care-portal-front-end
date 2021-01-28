import { Field, FieldAttributes, Form, Formik } from 'formik';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import auth from '../api/core/auth';

const logo = require('../assets/images/coachme.png');

const FormContainer = styled.div`
    text-align: center;
    margin: 200px auto auto auto; 
    width: 100%;
`;

const LogoColumn = styled.div`
    background-color: #EEF0F3;
    padding-top: 200px;
    height: 105vh
`;



const initialValues = {
  email: '',
  password: '',
};

const GlobalStyle = createGlobalStyle`
    html {
        overflow: hidden !important;
    }
`

const LoginField = styled.div`
    width: 70%;
    max-width: 768px;
    text-align: center;
    margin: 20px auto;
`

const LoginIcon = styled.span`
    position: absolute !important;
    left: 14px !important;
    top: 10px !important;
    font-size: 10px;
    color: #637792 !important;
`

const inputStyles = {
    backgroundColor: "rgb(221, 225, 231)",
    borderRadius: "15px",
    padding: "8px 20px 8px 32px",
    border: "none",
    width: "100%"
}

const buttonStyles = {
    backgroundColor: "#F29DA4",
    borderRadius: "15px",
    fontWeight: 800
}

const FieldWrapper = ({
  children,
  icon,
}: {
  children: FieldAttributes<any>;
  icon?: string;
}) => {
  if (!icon) return children;

  return (
    <LoginField>
      <p className="control has-icons-left has-icons-right">
        {children}
        <LoginIcon className="is-small is-left">
          <i className={`fas ${icon}`}></i>
        </LoginIcon>
      </p>
    </LoginField>
  );
};

const LoginForm = () => {
    const history = useHistory();

    const [isError, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState<null | string>(null);

    const handleSubmit = (values: IUserLogin) => {
        auth.login(values);
    };

    const loginComplete = ({ errorMessage }: { errorMessage?: any }) => {
        if (!errorMessage) {
            history.push('/dashboard');
        } else {
            setError(true);
            setErrorMsg(errorMessage.message);
        }
    };

    auth.addLoginSubscribers(loginComplete);

    return (
        <FormContainer>
            <h1 style = {{ fontWeight: 800, fontSize: 36, color: "#637792" }}>Login</h1>
            <p>Please enter your information below</p>

            { isError && 
                <p style = {{color: 'red'}}>{errorMsg}</p>
            }

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <FieldWrapper icon="fa-envelope">
                        <Field
                        name="email"
                        style = {inputStyles}
                        type="text"
                        placeholder="Email"
                        className = "form-field"
                        />
                    </FieldWrapper>

                    <FieldWrapper icon="fa-key">
                        <Field
                        name="password"
                        style = {inputStyles}
                        type="password"
                        placeholder="Password"
                        className = "form-field"
                        />
                    </FieldWrapper>

                    <button style = {buttonStyles} className={"button is-primary"} type="submit">
                        Login
                    </button>
                </Form>
            </Formik>
        </FormContainer>
    )
}

const LoginLogoContainer = styled.div`
    height: 108px;
    width: 370px;
    margin: 200px auto;
    position: relative;
`;

const Subheader = styled.h1`
    font-weight: 600;
    position: absolute;
    color: #637792;
    top: 65px;
    left: 105px;
    font-size: 30px;
`;

const Logo = styled.img`
    width: 328px;
    position: absolute;
`

const RegisterLink = styled.a`
    float: right;
    color: #F29DA4;
    position: absolute;
    top: 20px;
    right: 20px;
    font-weight: 800;
    &:hover {
        color: #EE6772;  
    }
`

const LogoContainer = () => {
    return (
        <LoginLogoContainer>
            <Logo src = {logo} id = "login-logo"></Logo>
            <Subheader>Coach Dashboard</Subheader>
        </LoginLogoContainer>
    );
}

const Login = () => {
    return (
        <div>
            <GlobalStyle></GlobalStyle>
            <div className="columns is-hidden-touch">
                <LogoColumn className="column is-hidden-mobile">
                    <LogoContainer></LogoContainer>
                </LogoColumn>
                <div className="column is-flex rows">
                    
                    <LoginForm></LoginForm>
                </div>
            </div>
            <div className = "is-hidden-desktop">
                <LoginForm></LoginForm>
            </div>
        </div>
  );
};

export default Login;