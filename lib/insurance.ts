export const pensionInsurance = (salary) => salary * 0.183 * 0.5;
export const healthInsurance = (salary) => salary * 0.0425 * 0.5;
export const employmentInsurance = (salary) => salary * 0.03;
export const socialInsurance = (salary) =>
  pensionInsurance(salary) +
  healthInsurance(salary) +
  employmentInsurance(salary);
