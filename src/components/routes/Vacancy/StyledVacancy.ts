import styled from 'styled-components';

const StyledVacancy = styled.div`
  width: 880px;
  max-width: 100%;

  h1 {
    margin-bottom: 15px;
    font-size: 36px;
    font-weight: 400;
  }

  .salary {
    margin-bottom: 25px;
    font-size: 22px;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;

    .employerName {
      font-size: 22px;
      margin-bottom: 5px;
    }

    img {
      width: 150px;
      object-fit: contain;
    }
  }

  .apply {
    margin-bottom: 25px;
    color: white;
    display: inline-block;
    cursor: pointer;
    height: 38px;
    position: relative;
    padding: 0 15px;
    font-size: 14px;
    font-family: inherit;
    line-height: 36px;
    background-color: #8cb900;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #7ea700;
    }
  }
`;

export default StyledVacancy;
