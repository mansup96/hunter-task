import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStores } from '../../../hooks';

const StyledAuthControl = styled.div`
  .name {
    color: ${({ theme }) => theme.white};
  }
  .link {
    margin-left: 20px;
    color: ${({ theme }) => theme.accent};
  }
`;

const AuthControl = () => {
  const { authStore } = useStores();

  return (
    <StyledAuthControl>
      {authStore.isAuth ? (
        <>
          <span className="name">{authStore.name}</span>
          <a className="link" onClick={authStore.logout}>
            Выйти
          </a>
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
      )}
    </StyledAuthControl>
  );
};

export default observer(AuthControl);
