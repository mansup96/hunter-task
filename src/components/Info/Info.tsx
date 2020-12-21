import React from 'react';
import { TSearchFor } from '../../store/searchStore';
import styled from 'styled-components';

const StyledInfo = styled.p`
  margin: 20px 30px;
`;

const declOfNum = (number: number, titles: string[]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

const wordMatches = {
  vacancies: ['вакансия', 'вакансии', 'вакансий'],
  resume: ['резюме', 'резюме', 'резюме'],
  employers: ['компания', 'компании', 'компаний'],
};

const Info = React.memo(
  ({ amount, type }: { amount: number; type: TSearchFor }) => {
    const declension = declOfNum(amount, wordMatches[type]);

    return (
      <StyledInfo>
        Найдено {amount} {declension}
      </StyledInfo>
    );
  }
);

export default Info;
