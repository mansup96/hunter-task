import styled from 'styled-components';

type TStyledSingleFilterProps = {
  isOpen: boolean;
};

const StyledSingleFilter = styled.div<TStyledSingleFilterProps>`
  padding-bottom: 20px;
  width: 100%;

  .filterSpoiler {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 6px;
    height: 26px;

    &:hover {
      background-color: ${({ theme }) => theme.gray};
      .angle {
        display: block;
      }
    }
  }

  .filterName {
    margin: 0;
    padding: 0;
    font-weight: 700;
    font-size: 12px;
  }

  .angle {
    display: none;
    margin-left: auto;
    width: 10px;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }

  .filterList {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }

  .restItems {
    font-size: 11px;
    border-bottom: 0;
    color: #999;
    margin-left: 10px;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.main};
    }
  }
`;

export default StyledSingleFilter;
