import styled from 'styled-components';

const StyledSearchLine = styled.div`
  width: 100%;

  .container {
    display: flex;
    align-items: center;
  }

  .searchInput {
    width: 100%;
    padding: 0 18px;
    line-height: 46px;
    font-size: 16px;
    height: 46px;
    border-radius: 0;
    border: 1px solid #cbd1d4;
  }

  .searchBtn {
    cursor: pointer;
    color: ${({ theme }) => theme.white};
    height: 46px;
    border-radius: 0;
    border: 0;
    background-color: ${({ theme }) => theme.accent};
    transition: background-color ${({ theme }) => theme.defaultTransition};
    padding: 0 25px;
    font-size: 16px;
    line-height: 44px;

    &:hover {
      background-color: ${({ theme }) => theme.accentHover};
    }
  }
`;

export default StyledSearchLine;
