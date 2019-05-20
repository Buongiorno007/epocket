export const COUNTRIES = 'countries/COUNTRIES';

export default (state = [], action) => {
  switch (action.type) {
    case COUNTRIES:
      return action.countries;
    default:
      return state;
  }
};

export const setCountries = countries => ({
  type: COUNTRIES,
  countries
});
