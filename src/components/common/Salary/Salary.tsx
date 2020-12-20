import React from 'react';
import { TSalary } from '../../../store/searchStore';

type TSalaryProps = {
  salary: TSalary;
  className: string;
};

const Salary = ({ salary, className }: TSalaryProps) => {
  return (
    <div className={className}>
      {salary.from && !salary.to && (
        <span>
          от {salary.from} {salary.currency}
        </span>
      )}
      {salary.to && !salary.from && (
        <span>
          до {salary.to} {salary.currency}
        </span>
      )}
      {salary.to && salary.from && (
        <span>
          {salary.from} - {salary.to} {salary.currency}
        </span>
      )}
    </div>
  );
};

export default Salary;
