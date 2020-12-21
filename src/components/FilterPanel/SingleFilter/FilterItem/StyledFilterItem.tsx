import styled from 'styled-components';

const StyledFilterItem = styled.li<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  cursor: pointer;
  font-weight: normal;
  font-size: 12px;
  width: 100%;
  background-color: ${({ active, theme }) =>
    active ? theme.gray : theme.white};

  &:hover {
    background-color: ${({ theme }) => theme.gray};

    img {
      display: block;
    }
  }

  .itemName {
    max-width: 130px;
  }

  .count {
    margin-left: auto;
  }

  img {
    display: none;
    margin-left: auto;
    width: 8px;
  }
`;

export default StyledFilterItem;
