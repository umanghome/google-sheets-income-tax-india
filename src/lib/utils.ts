export const getYearToConsider = (
  year: number | string,
  slabs: Array<[number, unknown]>,
) => {
  const yearAsNum = Number(year);
  const years = slabs.map(([year]) => year).sort();

  if (yearAsNum < years[0]) {
    // A year before the first year in the slabs
    return;
  }

  return years.find((_year) => {
    return yearAsNum <= _year;
  });
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
