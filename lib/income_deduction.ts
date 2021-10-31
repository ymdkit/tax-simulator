// 基礎控除
export const basicDeduction = 380000;

// 給与所得控除
export const salaryDeduction = (salary) => {
  if (salary <= 1625000) return 550000;
  if (salary <= 1800000) return salary * 0.4 - 100000;
  if (salary <= 3600000) return salary * 0.3 + 80000;
  if (salary <= 6600000) return salary * 0.2 + 440000;
  if (salary <= 8500000) return salary * 0.1 + 1100000;
  return 1950000;
};