import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthStore } from '../../../store/authStore';

type TAuthStoreProps = {
  authStore: AuthStore;
};

const AuthControl = ({ authStore }: TAuthStoreProps) => {

  return authStore.isAuth ? (
    <>
      <span>{authStore.name}</span>
      <button onClick={authStore.logout}>Выйти</button>
    </>
  ) : (
    <>
      <Link className="link" to="/login">
        Войти
      </Link>
      <Link className="link" to="/sign_up">
        Регистрация
      </Link>
    </>
  );
};

export default observer(AuthControl);
