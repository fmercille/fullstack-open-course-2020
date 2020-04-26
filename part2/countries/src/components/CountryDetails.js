import React from 'react'

const CountryDetails = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    Capital: {country.capital}<br />
    Population: {country.population}
    <h2>Languages</h2>
    <ul>
      {country.languages.map(lang =>
        <li key={lang.name}>{lang.name}</li>
      )}
    </ul>
    <img src={country.flag} width="300" alt="Flag" />
  </div>
)

export default CountryDetails