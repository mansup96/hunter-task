import styled, { css } from 'styled-components';

const cellStyle = () => css`
  display: block;
  width: 30px;
  height: 30px;
  text-align: center;
`;

const StyledPagination = styled.ul`
  display: flex;
  list-style-type: none;

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
