import styled from 'styled-components';

const StyledVacancyItem = styled.li<{ premium: boolean }>`
  padding: 20px;
  border: 1px solid ${({ premium }) => (premium ? '#f1c846' : '#e7e7e7')};
  font-size: 14px;
  margin-top: -1px;
  position: relative;
  z-index: ${({ premium }) => (premium ? '1' : '0')};

  .header {
    font-size: 18px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .salary {
    margin-left: auto;
  }

  .meta {
    font-size: 12px;
    color: ${({ theme }) => theme.fontGray};
  }

  .description {
    display: flex;
  }

  .snippet {
    width: 100%;
    margin: 10px 0;
    font-size: 14px;
  }

  .logo {
    display: block;
    width: 40px;
    margin-left: 15px;

    img {
      width: 100%;
    }
  }

  .footer {
    display: flex;
    align-items: center;

    a {
      color: ${({ theme }) => theme.accent};
    }

    .meta {
      margin-left: auto;
    }
  }
`;
export default StyledVacancyItem;
