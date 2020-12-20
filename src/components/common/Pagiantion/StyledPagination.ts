import styled, { css } from 'styled-components';

const cellStyle = () => css`
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

const StyledPagination = styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: center;
  align-items: center;
  padding: 0;

  .page {
    cursor: pointer;
    ${cellStyle()}

    &--active {
      font-weight: bold;
    }
  }

  .empty {
    ${cellStyle()}
  }
`;

export default StyledPagination;
