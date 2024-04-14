export const getYearToConsider = (
  year: number | string,
  slabs: Array<[number, unknown]>,
) => {
  const yearAsNum = Number(year);
  const years = slabs.map(([year]) => year).sort((a, b) => a - b);

  if (yearAsNum < years[0]) {
    // A year before the first year in the slabs
    return;
  }

  return (
    years.find((_year) => {
      return yearAsNum <= _year;
    }) || years[years.length - 1]
  );
};

export const getAgeToConsider = (
  age: number | string,
  slabs: Array<[number, unknown]>,
) => {
  const ageAsNum = Number(age);

  const ages = slabs.map(([slab]) => slab).sort((a, b) => a - b);

  return (
    ages.find((_age) => {
      return ageAsNum <= _age;
    }) || ages[ages.length - 1]
  );
};
