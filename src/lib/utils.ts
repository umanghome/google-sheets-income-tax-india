export const getYearToConsider = (year: string | number, years: string[]) => {
  const yearAsNum = Number(year);

  return years
    .sort()
    .reverse()
    .find((y) => {
      const _year = Number(y);

      return _year <= yearAsNum;
    });
};

export const getAgeToConsider = (age: string | number, ages: number[]) => {
  const ageAsNum = Number(age);

  const sorted = ages.sort((a, b) => a - b);
  const found =
    sorted.find((_age) => {
      return ageAsNum <= _age;
    }) || sorted[sorted.length - 1];

  return found;
};
