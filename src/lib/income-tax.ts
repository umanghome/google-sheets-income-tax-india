import { Regime } from '../types/regime';
import { FinancialYearStartIn } from '../types/years';
import { INCOME_TAX_SLABS_BY_REGIME } from './slabs/income-tax';
import { getAgeToConsider, getYearToConsider } from './utils';

export const calculateIncomeTax = (
  year: FinancialYearStartIn,
  age: number,
  regime: Regime,
  taxableAmount: number,
) => {
  const slabsForRegime = INCOME_TAX_SLABS_BY_REGIME[regime];
  const yearToConsider = getYearToConsider(year, Object.keys(slabsForRegime));

  if (!yearToConsider) {
    throw new Error(`Invalid year ${year}`);
  }

  const slabsForYear =
    slabsForRegime[yearToConsider as keyof typeof slabsForRegime]!;

  const ageToConsider = getAgeToConsider(
    age,
    slabsForYear.map(([age]) => age),
  );

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
