/* eslint-disable @typescript-eslint/no-unused-vars */

import { calculateCumulativeTax } from './lib/cumulative.js';
import { calculateIncomeTax } from './lib/income-tax.js';
import { calculateSurcharge } from './lib/surcharge.js';
import { Regime } from './types/regime.js';
import { FinancialYearStartIn } from './types/years.js';

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
function INCOME_TAX(
  year: FinancialYearStartIn,
  age: number,
  regime: Regime,
  taxableAmount: number,
) {
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
function SURCHARGE(
  year: FinancialYearStartIn,
  age: number,
  regime: Regime,
  taxableAmount: number,
) {
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
function CUMULATIVE_INCOME_TAX(
  year: FinancialYearStartIn,
  age: number,
  regime: Regime,
  taxableAmount: number,
) {
  return calculateCumulativeTax(year, age, regime, taxableAmount);
}
