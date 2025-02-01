import { Regime } from '../../types/regime.js';
import { FinancialYearStartIn } from '../../types/years.js';
import { lakhs } from '../number.js';

type Age = number;
type MaximumAmount = number;
type Percentage = number;

type IncomeTaxSlabs = Array<
  [FinancialYearStartIn, Array<[Age, Array<[MaximumAmount, Percentage]>]>]
>;

const _INCOME_TAX_SLABS_OLD_REGIME_2023: IncomeTaxSlabs[number][1] = [
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

const _INCOME_TAX_SLABS_NEW_REGIME_2023: IncomeTaxSlabs[number][1] = [
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

const _INCOME_TAX_SLABS_NEW_REGIME_2025: IncomeTaxSlabs[number][1] = [
  [
    Infinity,
    [
      [lakhs(4), 0],
      [lakhs(8), 5],
      [lakhs(12), 10],
      [lakhs(16), 15],
      [lakhs(20), 20],
      [lakhs(24), 25],
      [Infinity, 30],
    ],
  ],
];

const _INCOME_TAX_SLABS_OLD_REGIME: IncomeTaxSlabs = [
  [2023, _INCOME_TAX_SLABS_OLD_REGIME_2023],
] as const;

const _INCOME_TAX_SLABS_NEW_REGIME: IncomeTaxSlabs = [
  [2023, _INCOME_TAX_SLABS_NEW_REGIME_2023],
  [2025, _INCOME_TAX_SLABS_NEW_REGIME_2025],
];

export const INCOME_TAX_SLABS_BY_REGIME: Record<Regime, IncomeTaxSlabs> = {
  old: _INCOME_TAX_SLABS_OLD_REGIME,
  new: _INCOME_TAX_SLABS_NEW_REGIME,
} as const;
