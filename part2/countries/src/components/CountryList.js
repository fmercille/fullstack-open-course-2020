import React from 'react'

const CountryList = ({ countries, updateFilter }) => (
  <ul>
    {countries.map(country =>
      <li key={country.name}>{country.name}<button key={country.name + "_button"} country={country.name} onClick={() => updateFilter(country.name)}>Show</button></li>
    )}
  </ul >
)

export default CountryList