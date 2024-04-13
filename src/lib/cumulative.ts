import { Regime } from '../types/regime.js';
import { FinancialYearStartIn } from '../types/years.js';

import { calculateCess } from './cess.js';
import { calculateIncomeTax } from './income-tax.js';
import { calculateSurcharge } from './surcharge.js';

export const calculateCumulativeTax = (
  year: FinancialYearStartIn,
  age: number,
  regime: Regime,
  taxableAmount: number,
) => {
  const incomeTax = calculateIncomeTax(year, age, regime, taxableAmount);
  const surcharge = calculateSurcharge(year, age, regime, taxableAmount);
  const cess = calculateCess(incomeTax + surcharge);

  return incomeTax + surcharge + cess;
};
