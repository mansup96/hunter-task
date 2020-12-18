import React, { useEffect } from 'react';
import {
  Redirect,
  useHistory,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { useStores } from '../../hooks/useStore';
import { observer } from 'mobx-react-lite';
import LoginForm from './LoginForm/LoginForm';
import SignUpForm from './SignUpForm/SignUpForm';
import { TLoginFormData, TSignUpFormData } from '../../store/authStore';

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
    <div>
      {path === '/login' && <LoginForm onSubmit={submitLoginHandler} />}
      {path === '/sign_up' && <SignUpForm onSubmit={submitSignUpHandler} />}
    </div>
  );
});

export default withRouter(Auth);
