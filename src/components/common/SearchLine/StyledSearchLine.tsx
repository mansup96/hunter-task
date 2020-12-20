import styled from 'styled-components';

const StyledSearchLine = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;

  .container {
    display: flex;
    align-items: center;
    margin: 0 20px;
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
