import React from 'react';
import { TSalary } from '../../../store/vacancyStore';

type TSalaryProps = {
  salary: TSalary;
  className?: string;
  showType?: boolean;
};

const Salary = ({ salary, className, showType }: TSalaryProps) => {
  const renderType = () =>
    showType && salary.gross ? 'до вычета налогов' : 'на руки';

  return salary ? (
    <div className={className}>
      {salary.from && !salary.to && (
        <span>
          от {salary.from} {salary.currency} {renderType()}
        </span>
      )}
      {salary.to && !salary.from && (
        <span>
          до {salary.to} {salary.currency} {renderType()}
        </span>
      )}
      {salary.to && salary.from && (
        <span>
          {salary.from} - {salary.to} {salary.currency} {renderType()}
        </span>
      )}
    </div>
  ) : null;
};

export default Salary;
