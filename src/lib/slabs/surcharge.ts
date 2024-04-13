import { Regime } from '../../types/regime.js';
import { FinancialYearStartIn } from '../../types/years.js';
import { crores, lakhs } from '../number.js';

type MaximumAmount = number;
type Percentage = number;

type SurchargeSlabs = Array<
  [FinancialYearStartIn, Array<[MaximumAmount, Percentage]>]
>;

const _SURCHARGE_SLABS_OLD_REGIME: SurchargeSlabs[number][1] = [
  [lakhs(50), 0],
  [crores(1), 10],
  [crores(2), 15],
  [crores(5), 25],
  [Infinity, 37],
];

const _SURCHARGE_SLABS_NEW_REGIME: SurchargeSlabs[number][1] = [
  [lakhs(50), 0],
  [crores(1), 10],
  [crores(2), 15],
  [Infinity, 25],
];

export const SURCHARGE_SLABS_BY_REGIME: Record<Regime, SurchargeSlabs> = {
  old: [[2023, _SURCHARGE_SLABS_OLD_REGIME]],
  new: [[2023, _SURCHARGE_SLABS_NEW_REGIME]],
} as const;
