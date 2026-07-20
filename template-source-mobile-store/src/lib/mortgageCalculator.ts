export interface MortgageInput {
  price: number;
  downPaymentPercent: number;
  interestRate: number;
  termYears: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  loanAmount: number;
  downPayment: number;
  totalInterest: number;
  totalCost: number;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const downPayment = input.price * (input.downPaymentPercent / 100);
  const loanAmount = input.price - downPayment;
  const monthlyRate = input.interestRate / 100 / 12;
  const numPayments = input.termYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else {
    monthlyPayment = loanAmount / numPayments;
  }

  const totalCost = monthlyPayment * numPayments;
  const totalInterest = totalCost - loanAmount;

  return {
    monthlyPayment: Math.round(monthlyPayment),
    loanAmount: Math.round(loanAmount),
    downPayment: Math.round(downPayment),
    totalInterest: Math.round(totalInterest),
    totalCost: Math.round(totalCost + downPayment),
  };
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
