import test from 'ava';

import { lakhs, crores } from './number';

test('lakhs', (t) => {
  t.is(lakhs(2), 200000);
});

test('crores', (t) => {
  t.is(crores(2), 20000000);
});
