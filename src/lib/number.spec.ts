import test from 'ava';

import { crores, lakhs } from './number';

test('lakhs', (t) => {
  t.is(lakhs(2), 200000);
});

test('crores', (t) => {
  t.is(crores(2), 20000000);
});
