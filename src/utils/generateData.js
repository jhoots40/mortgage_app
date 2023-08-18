import { actions } from "../store";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const generateMortgage = (
  principal,
  years,
  interest,
  int_tens,
  int_hund,
  int_thou,
  start_year,
  start_month,
  dispatch
) => {
  let totalInterest =
    interest +
    Number(int_tens / 10) +
    Number(int_hund / 100) +
    Number(int_thou / 1000);
  totalInterest /= 100;

  let monthlyInterestRate = totalInterest / 12;
  let numberOfPayments = years * 12;
  let monthlyPaymentCalc =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  let remainingPrincipal = principal;
  dispatch(actions.setPayment(parseInt(monthlyPaymentCalc)));

  let monthlyMortgageInfo = [];
  let yearlyMortgageInfo = [];
  let yearlyPrincipal = 0;
  let yearlyInterest = 0;

  for (let i = 0; i < numberOfPayments; i++) {
    let interestPayment = remainingPrincipal * monthlyInterestRate;
    let principalPayment = monthlyPaymentCalc - interestPayment;
    remainingPrincipal -= principalPayment;

    let toAdd = {
      id: Math.floor((i + start_month) / 12) + 2023,
      month: months[(i + start_month) % 12],
      prin_payment: principalPayment,
      int_payment: interestPayment,
      remaining: remainingPrincipal,
      interest: totalInterest,
    };

    yearlyPrincipal += principalPayment;
    yearlyInterest += interestPayment;

    if ((i + start_month) % 12 === 11) {
      let currentYear = {
        id: Math.floor((i + start_month) / 12) + start_year,
        principal_paid: yearlyPrincipal,
        interest_paid: yearlyInterest,
        remaining_principal: remainingPrincipal,
      };
      yearlyMortgageInfo.push(currentYear);
      yearlyPrincipal = 0;
      yearlyInterest = 0;
    }

    monthlyMortgageInfo.push(toAdd);
  }

  dispatch(actions.setMonthlyMortgage(monthlyMortgageInfo));
  dispatch(actions.setYearlyMortgage(yearlyMortgageInfo));
  console.log(monthlyMortgageInfo);
  console.log(yearlyMortgageInfo);
};
