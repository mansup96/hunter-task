import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../hooks';
import { useParams } from 'react-router-dom';
import StyledVacancy from './StyledVacancy';
import Salary from '../../common/Salary/Salary';
import { TSpecification } from '../../../store/vacancyStore';

const Vacancy = () => {
  const { vacancyStore } = useStores();
  const { id } = useParams<{ id: string }>();
  const { vacancy } = vacancyStore;

  useEffect(() => {
    if (vacancy) document.title = vacancy.name;
  }, [vacancy]);

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
          {vacancy.address ? (
            <p className={'address'}>{vacancy.address.raw}</p>
          ) : (
            <p className={'address'}>{vacancy.area.name}</p>
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

      <div className="specifications">
        {vacancy.employment && (
          <span className="specificationItem">
            {
              vacancyStore.dictionaries.employment.find(
                (empl: TSpecification) => empl.id === vacancy?.employment?.id
              ).name
            }
          </span>
        )}

        {vacancy.schedule && (
          <span className="specificationItem">
            {
              vacancyStore.dictionaries.schedule.find(
                (schedule: TSpecification) =>
                  schedule.id === vacancy?.schedule?.id
              ).name
            }
          </span>
        )}
      </div>

      {vacancy.branded_description ? (
        <div
          className="brandedDescription"
          dangerouslySetInnerHTML={{ __html: vacancy.branded_description }}
        />
      ) : vacancy.description ? (
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: vacancy.description }}
        />
      ) : null}

      {!!vacancy.key_skills.length && (
        <div className="keySkills">
          <p className="title">Ключевые навыки:</p>
          <div className="keySkillsWrapper">
            {vacancy.key_skills.map(skill => (
              <p className="skillItem">{skill.name}</p>
            ))}
          </div>
        </div>
      )}
    </StyledVacancy>
  ) : null;
};

export default observer(Vacancy);
