'use strict';

const calculateCess = (taxAndSurcharge) => {
  return taxAndSurcharge * 0.04;
};

const lakhs = (number) => {
  return number * 10e4;
};
const crores = (number) => {
  return number * 10e6;
};

const _INCOME_TAX_SLABS_OLD_REGIME_2023 = [
  [
    59,
    [
      [lakhs(2.5), 0],
      [lakhs(5), 5],
      [lakhs(10), 20],
      [Infinity, 30],
    ],
  ],
  [
    80,
    [
      [lakhs(3), 0],
      [lakhs(5), 5],
      [lakhs(10), 20],
      [Infinity, 30],
    ],
  ],
  [
    Infinity,
    [
      [lakhs(5), 0],
      [lakhs(10), 20],
      [Infinity, 30],
    ],
  ],
];
const _INCOME_TAX_SLABS_NEW_REGIME_2023 = [
  [
    Infinity,
    [
      [lakhs(3), 0],
      [lakhs(6), 5],
      [lakhs(9), 10],
      [lakhs(12), 15],
      [lakhs(15), 20],
      [Infinity, 30],
    ],
  ],
];
const _INCOME_TAX_SLABS_OLD_REGIME = [
  [2023, _INCOME_TAX_SLABS_OLD_REGIME_2023],
];
const _INCOME_TAX_SLABS_NEW_REGIME = [
  [2023, _INCOME_TAX_SLABS_NEW_REGIME_2023],
];
const INCOME_TAX_SLABS_BY_REGIME = {
  old: _INCOME_TAX_SLABS_OLD_REGIME,
  new: _INCOME_TAX_SLABS_NEW_REGIME,
};

const getYearToConsider = (year, slabs) => {
  const yearAsNum = Number(year);
  const years = slabs.map(([year]) => year).sort((a, b) => a - b);
  if (yearAsNum < years[0]) {
    // A year before the first year in the slabs
    return;
  }
  return (
    years.find((_year) => {
      return yearAsNum <= _year;
    }) || years[years.length - 1]
  );
};
const getAgeToConsider = (age, slabs) => {
  const ageAsNum = Number(age);
  const ages = slabs.map(([slab]) => slab).sort((a, b) => a - b);
  return (
    ages.find((_age) => {
      return ageAsNum <= _age;
    }) || ages[ages.length - 1]
  );
};

const calculateIncomeTax = (year, age, regime, taxableAmount) => {
  const slabsForRegime = INCOME_TAX_SLABS_BY_REGIME[regime];
  const yearToConsider = getYearToConsider(year, slabsForRegime);
  if (!yearToConsider) {
    throw new Error(`Invalid year ${year}`);
  }
  const slabsForYear = slabsForRegime.find(
    ([year]) => year === yearToConsider,
  )[1];
  const ageToConsider = getAgeToConsider(age, slabsForYear);
  if (!ageToConsider) {
    throw new Error(
      `Invalid age ${age}. Valid ages: ${slabsForYear.map(([age]) => age)}`,
    );
  }
  const slabs = slabsForYear.find(([age]) => age === ageToConsider)?.[1];
  if (!slabs) {
    throw new Error('Slabs not found');
  }
  let amount = taxableAmount;
  const tax = slabs.reduce((acc, [upTo, percentage], index) => {
    if (amount <= 0) {
      return acc;
    }
    const prevUpTo = index > 0 ? slabs[index - 1][0] : 0;
    const amountInSlab = Math.min(amount, upTo - prevUpTo);
    // Reduce amount for next iteration
    amount = amount - amountInSlab;
    // Calculate tax for the slab
    const taxForSlab = amountInSlab * (percentage / 100);
    return acc + taxForSlab;
  }, 0);
  return tax;
};

const _SURCHARGE_SLABS_OLD_REGIME = [
  [lakhs(50), 0],
  [crores(1), 10],
  [crores(2), 15],
  [crores(5), 25],
  [Infinity, 37],
];
const _SURCHARGE_SLABS_NEW_REGIME = [
  [lakhs(50), 0],
  [crores(1), 10],
  [crores(2), 15],
  [Infinity, 25],
];
const SURCHARGE_SLABS_BY_REGIME = {
  old: [[2023, _SURCHARGE_SLABS_OLD_REGIME]],
  new: [[2023, _SURCHARGE_SLABS_NEW_REGIME]],
};

const calculateSurcharge = (year, age, regime, taxableAmount) => {
  const slabsForRegime = SURCHARGE_SLABS_BY_REGIME[regime];
  const yearToConsider = getYearToConsider(year, slabsForRegime);
  if (!yearToConsider) {
    throw new Error(`Invalid year ${year}`);
  }
  const slabsForYear = slabsForRegime.find(
    ([year]) => year === yearToConsider,
  )[1];
  const slab = slabsForYear.find(([amount]) => taxableAmount <= amount);
  const previousSlab = slabsForYear[slabsForYear.indexOf(slab) - 1];
  const incomeTax = calculateIncomeTax(year, age, regime, taxableAmount);
  const surcharge = incomeTax * (slab[1] / 100);
  const marginalRelief = calculateMarginalRelief(
    year,
    age,
    regime,
    taxableAmount,
    slab,
    previousSlab,
  );
  return surcharge - marginalRelief;
};
const calculateMarginalRelief = (
  year,
  age,
  regime,
  taxableAmount,
  currentSlab,
  previousSlab,
) => {
  const incomeTaxOnCurrent = calculateIncomeTax(
    year,
    age,
    regime,
    taxableAmount,
  );
  if (!previousSlab) {
    return 0;
  }
  const surchargeOnCurrent = incomeTaxOnCurrent * (currentSlab[1] / 100);
  const assumedIncomeInPreviousSlab = previousSlab[0];
  const incomeTaxOnAssumed = calculateIncomeTax(
    year,
    age,
    regime,
    assumedIncomeInPreviousSlab,
  );
  const surchargeOnAssumed = incomeTaxOnAssumed * (previousSlab[1] / 100);
  const totalTaxOnCurrent = incomeTaxOnCurrent + surchargeOnCurrent;
  const totalTaxOnAssumed = incomeTaxOnAssumed + surchargeOnAssumed;
  const differenceInIncome = taxableAmount - assumedIncomeInPreviousSlab;
  const differenceInTax = totalTaxOnCurrent - totalTaxOnAssumed;
  if (differenceInTax > differenceInIncome) {
    return differenceInTax - differenceInIncome;
  } else {
    return 0;
  }
};

const calculateCumulativeTax = (year, age, regime, taxableAmount) => {
  const incomeTax = calculateIncomeTax(year, age, regime, taxableAmount);
  const surcharge = calculateSurcharge(year, age, regime, taxableAmount);
  const cess = calculateCess(incomeTax + surcharge);
  return incomeTax + surcharge + cess;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Get income tax without surcharge and cess.
 *
 * @param {2023|2024} year Year in which financial year starts. Eg. 2024
 * @param {number} age Age of the taxpayer. Eg. 30
 * @param {"old"|"new"} regime Regime, "old" or "new"
 * @param {number} taxableAmount Taxable amount
 * @returns {number}
 *
 * @customfunction
 *
 */
// @ts-expect-error This function is unused in this file and it cannot be exported as `exports.INCOME_TAX` will throw an error in Apps Script
function INCOME_TAX(year, age, regime, taxableAmount) {
  return calculateIncomeTax(year, age, regime, taxableAmount);
}
/**
 * Get surcharge based on taxable income.
 *
 * @param {2023|2024} year Year in which financial year starts. Eg. 2024
 * @param {number} age Age of the taxpayer. Eg. 30
 * @param {"old"|"new"} regime Regime, "old" or "new"
 * @param {number} taxableAmount Taxable amount
 * @returns {number}
 *
 * @customfunction
 *
 */
// @ts-expect-error This function is unused in this file and it cannot be exported as `exports.SURCHARGE` will throw an error in Apps Script
function SURCHARGE(year, age, regime, taxableAmount) {
  return calculateSurcharge(year, age, regime, taxableAmount);
}
/**
 * Get cumulative income tax — includes surcharge and cess
 *
 * @param {2023|2024} year Year in which financial year starts. Eg. 2024
 * @param {number} age Age of the taxpayer. Eg. 30
 * @param {"old"|"new"} regime Regime, "old" or "new"
 * @param {number} taxableAmount Taxable amount
 * @returns {number}
 *
 * @customfunction
 *
 */
// @ts-expect-error This function is unused in this file and it cannot be exported as `exports.CUMULATIVE_INCOME_TAX` will throw an error in Apps Script
function CUMULATIVE_INCOME_TAX(year, age, regime, taxableAmount) {
  return calculateCumulativeTax(year, age, regime, taxableAmount);
}
