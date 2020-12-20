import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${props => props.theme.main};
  padding: 15px 20px;
  margin-bottom: 20px;

  .container {
    display: flex;
    margin: 0 auto;
    align-items: center;
    width: 860px;
    max-width: 100%;
  }

  & .logo {
    display: block;
    margin: 0 auto 0 0;
    color: ${({ theme }) => theme.accent};
    font-family: ${props => props.theme.sansCaption};
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 31px;
  }
`;

export default StyledHeader;
