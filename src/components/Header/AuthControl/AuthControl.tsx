import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStores } from '../../../hooks';
import preloader from '../../../static/icons/preloader.svg';

const StyledAuthControl = styled.div`
  .name {
    color: ${({ theme }) => theme.white};
  }
  .link {
    cursor: pointer;
    margin-left: 20px;
    color: ${({ theme }) => theme.accent};
  }

  .logout {
    cursor: pointer;
    margin-left: 20px;
    color: ${({ theme }) => theme.accent};
    background-color: transparent;
    border: none;
  }

  img {
    width: 28px;
    margin-right: 30px;
  }
`;

const AuthControl = () => {
  const { authStore } = useStores();

  return authStore.isMeChecked ? (
    <StyledAuthControl>
      {authStore.isAuth && authStore.isMeChecked ? (
        <>
          <span className="name">{authStore.name}</span>
          <button className="logout" onClick={authStore.logout}>
            Выйти
          </button>
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
  ) : (
    <StyledAuthControl>
      <img src={preloader} alt="preloader" />
    </StyledAuthControl>
  );
};

export default observer(AuthControl);
