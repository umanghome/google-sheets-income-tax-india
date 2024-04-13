// eslint-disable @typescript-eslint/no-unused-vars

import { calculateIncomeTax } from './lib/income-tax';
import { Regime } from './types/regime';
import { FinancialYearStartIn } from './types/years';

/**
 *
 * @param {number} year Year in which financial year starts. Eg. "2024"
 * @param age Age of the taxpayer. Eg. 30
 * @param regime Regime, "old" or "new"
 * @param taxableAmount Taxable amount
 * @returns {number}
 *
 * @customfunction
 *
 */
// @ts-ignore This function is unused in this file and it cannot be exported as `exports.INCOME_TAX` will throw an error in Apps Script
function INCOME_TAX(
  year: FinancialYearStartIn,
  age: number,
  regime: Regime,
  taxableAmount: number,
) {
  return calculateIncomeTax(year, age, regime, taxableAmount);
}
