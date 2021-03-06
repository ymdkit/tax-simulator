import { socialInsurance } from "./insurance";
import { basicDeduction, salaryDeduction } from "./resident_deduction";

// 課税所得
export const taxableIncome = (salary: number, totalIncome: number): number => {
  //todo その他の控除
  return Math.max(
    0,
    totalIncome -
      (basicDeduction + salaryDeduction(salary) + socialInsurance(salary))
  );
};

// 住民税
export const residentTax = (salary: number, totalIncome: number): number => {
  // 均等割
  const baseResidentTax = 1500 + 3500;

  // 非課税判定（本当は被扶養者の人数で式が変わる）
  if (taxableIncome(salary, totalIncome) < 450000) return 0;

  return taxableIncome(salary, totalIncome) * 0.1 + baseResidentTax;
};
