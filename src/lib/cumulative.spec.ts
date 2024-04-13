import test from 'ava';

import { calculateCumulativeTax } from './cumulative.js';

test('calculateCumulativeTax: old regime, no surcharge', (t) => {
  t.is(calculateCumulativeTax('2023', 30, 'old', 25_00_000), 5_85_000);
});

test('calculateCumulativeTax: old regime, with surcharge', (t) => {
  t.is(calculateCumulativeTax('2023', 30, 'old', 75_00_000), 23_59_500);
});

test('calculateCumulativeTax: old regime, last slab of surcharge', (t) => {
  t.is(calculateCumulativeTax('2023', 30, 'old', 6_00_000_00), 2_53_79_250);
});

test('calculateCumulativeTax: old regime, surcharge marginal relief', (t) => {
  t.is(calculateCumulativeTax('2023', 30, 'old', 51_00_000), 14_69_000);
});

test('calculateCumulativeTax: new regime, no surcharge', (t) => {
  t.is(calculateCumulativeTax('2023', 30, 'new', 25_00_000), 4_68_000);
});

test('calculateCumulativeTax: new regime, with surcharge', (t) => {
  t.is(calculateCumulativeTax('2023', 30, 'new', 75_00_000), 22_30_800);
});

test('calculateCumulativeTax: new regime, last slab of surcharge', (t) => {
  t.is(calculateCumulativeTax('2023', 30, 'new', 6_00_000_00), 2_30_10_000);
});

test('calculateCumulativeTax: new regime, surcharge marginal relief', (t) => {
  t.is(calculateCumulativeTax('2023', 30, 'new', 51_00_000), 13_52_000);
});
