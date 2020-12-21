import styled from 'styled-components';

const StyledVacancy = styled.div`
  width: 880px;
  max-width: 100%;
  padding-bottom: 100px;

  h1 {
    font-size: 36px;
    font-weight: 400;
  }

  .salary {
    margin-top: 15px;
    font-size: 22px;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;

    .employerName {
      display: block;
      font-size: 22px;
      margin-bottom: 10px;
    }

    img {
      width: 150px;
      object-fit: contain;
    }
  }

  .apply {
    margin-top: 25px;
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

  .specifications {
    display: flex;
    margin-top: 20px;

    .specificationItem {
      display: block;
      margin-right: 5px;

      &:after {
        content: '/';
        margin-left: 5px;
      }
      &:last-child {
        &:after {
          content: '';
        }
      }
    }
  }

  .brandedDescription {
    width: fit-content;
    box-shadow: 1px 1px 15px #141414;
    margin-top: 25px;
  }

  .description {
    margin-top: 25px;

    ul {
      list-style: none;
      li {
        position: relative;
        margin-bottom: 5px;
        &:before {
          display: block;
          position: absolute;
          right: 100%;
          padding-right: 6px;
          content: '—';
        }
      }
    }

    p {
      margin-bottom: 15px;
    }
  }

  .keySkills {
    margin-top: 25px;

    .title {
      font-size: 20px;
      margin-bottom: 20px;
    }

    .keySkillsWrapper {
      display: flex;
      flex-wrap: wrap;
    }

    .skillItem {
      padding: 10px;
      margin: 0 15px 15px 0;
      background-color: ${({ theme }) => theme.gray};
    }
  }
`;

export default StyledVacancy;
