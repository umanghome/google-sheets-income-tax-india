import test from 'ava';

import { calculateSurcharge } from './surcharge.js';

test('calculateSurcharge: old regime, no surcharge', (t) => {
  t.is(calculateSurcharge(2023, 30, 'old', 25_00_000), 0);
});

test('calculateSurcharge: old regime, with surcharge', (t) => {
  t.is(calculateSurcharge(2023, 30, 'old', 75_00_000), 2_06_250);
});

test('calculateSurcharge: old regime, surcharge at last slab', (t) => {
  t.is(calculateSurcharge(2023, 30, 'old', 6_00_000_00), 65_90_625);
});

test('calculateSurcharge: old regime, surcharge with marginal relief', (t) => {
  t.is(calculateSurcharge(2023, 30, 'old', 51_00_000), 70_000);
});

test('calculateSurcharge: new regime, no surcharge', (t) => {
  t.is(calculateSurcharge(2023, 30, 'new', 25_00_000), 0);
});

test('calculateSurcharge: new regime, surcharge at last slab', (t) => {
  t.is(calculateSurcharge(2023, 30, 'new', 75_00_000), 1_95_000);
});

test('calculateSurcharge: new regime, with surcharge', (t) => {
  t.is(calculateSurcharge(2023, 30, 'new', 6_00_000_00), 44_25_000);
});

test('calculateSurcharge: new regime, surcharge with marginal relief', (t) => {
  t.is(calculateSurcharge(2023, 30, 'new', 51_00_000), 70_000);
});
