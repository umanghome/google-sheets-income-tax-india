export const getYearToConsider = (year: number | string, years: string[]) => {
  const yearAsNum = Number(year);

  const found = years
    .sort()
    .reverse()
    .find((y) => {
      const _year = Number(y);

      return _year <= yearAsNum;
    });

  return Number(found);
};

export const getAgeToConsider = (age: number | string, ages: number[]) => {
  const ageAsNum = Number(age);

  const sorted = ages.sort((a, b) => a - b);
  const found =
    sorted.find((_age) => {
      return ageAsNum <= _age;
    }) || sorted[sorted.length - 1];

  return found;
};
