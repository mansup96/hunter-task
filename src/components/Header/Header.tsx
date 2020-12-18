import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthControl from './AuthControl/AuthControl';
import { useStores } from '../../hooks/useStore';

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${props => props.theme.main};
  padding: 15px 20px;
  margin-bottom: 100px;
  display: flex;
  align-items: center;

  & .logo {
    display: block;
    margin: 0 auto 0 0;
    color: ${({ theme }) => theme.white};
    font-family: ${props => props.theme.sansCaption};
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 31px;
  }

  & .link {
    color: ${({ theme }) => theme.white};
  }
`;

const Header = () => {
  const { authStore } = useStores();
  console.log(authStore);
  return (
    <StyledHeader>
      <Link to="/" className="logo">
        HunterTask
      </Link>
      <AuthControl authStore={authStore} />
    </StyledHeader>
  );
};

export default Header;
