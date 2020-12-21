import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../hooks';
import { useParams } from 'react-router-dom';
import StyledVacancy from './StyledVacancy';
import Salary from '../../common/Salary/Salary';

const Vacancy = () => {
  const { vacancyStore } = useStores();
  const { id } = useParams<{ id: string }>();
  const { vacancy } = vacancyStore;

  useEffect(() => {
    vacancyStore.getVacancy(id);
    return () => {
      vacancyStore.setVacancy(null);
    };
  }, [id, vacancyStore]);

  return vacancy ? (
    <StyledVacancy>
      <h1>{vacancy.name}</h1>
      <Salary salary={vacancy.salary} className={'salary'} />
      <div className="meta">
        <div>
          <a
            href={vacancy.employer.alternate_url}
            target="_blank"
            rel="noreferrer"
            className="employerName"
          >
            {vacancy.employer.name}
          </a>
          {vacancy.address && (
            <p className={'address'}>{vacancy.address.raw}</p>
          )}
        </div>
        {vacancy.employer.logo_urls && (
          <img src={vacancy.employer.logo_urls.original} alt="logo" />
        )}
      </div>
      <a
        href={vacancy.apply_alternate_url}
        className="apply"
        target="_blank"
        rel="noreferrer"
      >
        Откликнуться
      </a>

      {vacancy.branded_description ? (
        <div
          className="brandedDescription"
          dangerouslySetInnerHTML={{ __html: vacancy.branded_description }}
        />
      ) : vacancy.description ? (
        <div
          className="brandedDescription"
          dangerouslySetInnerHTML={{ __html: vacancy.description }}
        />
      ) : null}
    </StyledVacancy>
  ) : (
    <div></div>
  );
};

export default observer(Vacancy);
