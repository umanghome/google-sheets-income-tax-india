import { Regime } from '../types/regime.js';
import { Slab } from '../types/slabs.js';
import { FinancialYearStartIn } from '../types/years.js';

import { calculateIncomeTax } from './income-tax.js';
import { SURCHARGE_SLABS_BY_REGIME } from './slabs/surcharge.js';
import { getYearToConsider } from './utils.js';

export const calculateSurcharge = (
  year: FinancialYearStartIn,
  age: number,
  regime: Regime,
  taxableAmount: number,
) => {
  const slabsForRegime = SURCHARGE_SLABS_BY_REGIME[regime];
  const yearToConsider = getYearToConsider(year, slabsForRegime);

  if (!yearToConsider) {
    throw new Error(`Invalid year ${year}`);
  }

  const slabsForYear = slabsForRegime.find(
    ([year]) => year === yearToConsider,
  )![1];

  const slab = slabsForYear.find(([amount]) => taxableAmount <= amount)!;
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
  year: FinancialYearStartIn,
  age: number,
  regime: Regime,
  taxableAmount: number,
  currentSlab: Slab,
  previousSlab?: Slab,
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
