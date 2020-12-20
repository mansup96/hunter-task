import React from 'react';
import { Link } from 'react-router-dom';
import AuthControl from './AuthControl/AuthControl';
import StyledHeader from './StyledHeader';

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/" className="logo">
        HunterTask
      </Link>
      <AuthControl />
    </StyledHeader>
  );
};

export default Header;
