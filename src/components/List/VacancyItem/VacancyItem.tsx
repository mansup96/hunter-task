import React from 'react';
import { TVacancy } from '../../../store/searchStore';
import StyledVacancyItem from './StyledVacancyItem';
import Salary from '../../common/Salary/Salary';
import { Link } from 'react-router-dom';

const VacancyItem = ({ item }: { item: TVacancy }) => {
  return (
    <StyledVacancyItem premium={item.premium}>
      <div className="header">
        <Link className="title" to={`/vacancy/${item.id}`}>
          {item.name}
        </Link>
        {item.salary && <Salary salary={item.salary} className="salary" />}
      </div>
      {item.employer && (
        <a
          href={item.employer.alternate_url}
          target="_blank"
          rel="noreferrer"
          className="meta"
        >
          {item.employer.name}
        </a>
      )}
      {item.employer && <p className="meta">{item.area.name}</p>}
      <div className="description">
        <div className="snippet">
          <p>{item.snippet.responsibility}</p>
          <p>{item.snippet.requirement}</p>
        </div>
        {item.employer.logo_urls && (
          <a
            className="logo"
            href={item.employer.alternate_url}
            target="_blank"
            rel="noreferrer"
          >
            <img src={item.employer.logo_urls['240']} alt="logo" />
          </a>
        )}
      </div>
      <div className="footer">
        <a href={item.apply_alternate_url} target="_blank" rel="noreferrer">
          Откликнуться
        </a>
        <p className="meta">
          {new Date(item.published_at).toLocaleDateString('ru', {
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>
    </StyledVacancyItem>
  );
};

export default VacancyItem;
