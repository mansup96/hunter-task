import React from 'react';
import { Link } from 'react-router-dom';
import AuthControl from './AuthControl/AuthControl';
import StyledHeader from './StyledHeader';

const Header = () => {
  return (
    <StyledHeader>
      <div className="container">
        <Link to="/" className="logo">
          HunterTask
        </Link>
        <AuthControl />
      </div>
    </StyledHeader>
  );
};

export default Header;
