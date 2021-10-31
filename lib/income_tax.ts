import { basicDeduction, salaryDeduction } from "./income_deduction";
import { socialInsurance } from "./insurance";

// 課税所得
export const taxableIncome = (salary: number): number => {
  //todo その他の控除
  return (
    salary - (basicDeduction + salaryDeduction(salary) + socialInsurance(salary))
  );
};

// 所得税
export const incomeTax = (salary: number): number => {
  if (taxableIncome(salary) < 1950000) return 0;
  if (taxableIncome(salary) < 3300000)
    return taxableIncome(salary) * 0.1 - 97500;
  if (taxableIncome(salary) < 6950000)
    return taxableIncome(salary) * 0.2 - 427500;
  if (taxableIncome(salary) < 9000000)
    return taxableIncome(salary) * 0.23 - 636000;
  if (taxableIncome(salary) < 18000000)
    return taxableIncome(salary) * 0.33 - 1536000;
  if (taxableIncome(salary) < 40000000)
    return taxableIncome(salary) * 0.4 - 2796000;
  return taxableIncome(salary) * 0.45 - 4796000;
};
