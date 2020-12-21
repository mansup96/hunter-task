import React, { useEffect } from 'react';
import { useHistory, withRouter, RouteComponentProps } from 'react-router-dom';
import { useStores } from '../../../hooks';
import { observer } from 'mobx-react-lite';
import LoginForm from './LoginForm/LoginForm';
import SignUpForm from './SignUpForm/SignUpForm';
import { TLoginFormData, TSignUpFormData } from '../../../store/authStore';
import styled from 'styled-components';

const StyledAuth = styled.div`
  width: 340px;
  margin: 50px auto 0;
  text-align: center;

  h1 {
    margin: 35px 0;
  }

  form {
    width: 100%;
  }

  label {
    display: block;
    text-align: left;
    font-size: 16px;
    margin-bottom: 7px;
  }

  .inputWrapper {
    margin-bottom: 15px;
    position: relative;
  }

  input {
    width: 100%;
    padding: 5px 12px;
    font-size: 16px;
    line-height: 20px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.fontGray};

    &:focus {
      border-color: ${({ theme }) => theme.accent};
    }
  }

  button {
    margin-top: 20px;
    background-color: ${({ theme }) => theme.accent};
    transition: background-color ${({ theme }) => theme.defaultTransition},
      border-color ${({ theme }) => theme.defaultTransition};
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.accent};
    width: 100%;
    padding: 8px 16px;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border-radius: 5px;

    &:hover {
      background-color: ${({ theme }) => theme.accentHover};
    }

    &[disabled] {
      background-color: #8fbcde;
      border-color: #8fbcde;
    }
  }

  .error {
    position: absolute;
    top: 100%;
    left: 0;
    font-size: 10px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.warn};

    &--common {
      color: ${({ theme }) => theme.warn};
      font-size: 18px;
    }
  }

  .success {
    display: block;
    margin-top: 10px;
  }
`;

export const Auth = observer((props: RouteComponentProps) => {
  const { authStore } = useStores();

  const {
    match: { path },
  } = props;

  const history = useHistory();
  useEffect(() => {
    if (authStore.isAuth) {
      history.push('/');
    }
  }, [history, authStore.isAuth]);

  const submitLoginHandler = async (formData: TLoginFormData) => {
    return await authStore.login(formData);
  };

  const submitSignUpHandler = async (formData: TSignUpFormData) => {
    return await authStore.signUp(formData);
  };

  return (
    <StyledAuth>
      {path === '/login' && <LoginForm onSubmit={submitLoginHandler} />}
      {path === '/sign_up' && <SignUpForm onSubmit={submitSignUpHandler} />}
    </StyledAuth>
  );
});

export default withRouter(Auth);
