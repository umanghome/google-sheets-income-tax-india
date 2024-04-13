import test from 'ava';

import { calculateIncomeTax } from './income-tax.js';

test('calculateIncomeTax: FY 2021-22 is invalid', (t) => {
  const error = t.throws(
    () => {
      // @ts-expect-error Year is invalid
      calculateIncomeTax('2021', 30, 'new', 1000000);
    },
    { instanceOf: Error },
  );

  t.is(error.message, 'Invalid year 2021');
});

test('calculateIncomeTax: 58 years, old regime', (t) => {
  t.is(calculateIncomeTax('2023', 58, 'old', 20_00_000), 4_12_500);
});

test('calculateIncomeTax: 62 years, old regime', (t) => {
  t.is(calculateIncomeTax('2023', 62, 'old', 20_00_000), 4_10_000);
});

test('calculateIncomeTax: 82 years, old regime', (t) => {
  t.is(calculateIncomeTax('2023', 82, 'old', 20_00_000), 4_00_000);
});

test('calculateIncomeTax: 58 years, new regime', (t) => {
  t.is(calculateIncomeTax('2023', 58, 'new', 20_00_000), 3_00_000);
});
