import React from 'react'

import CountryDetails from './CountryDetails'
import CountryList from './CountryList'

const Results = ({ countries, updateFilter }) => {
  if (countries.length === 0) {
    return (
      <div>
        There are no match. Please select another filter.
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        <CountryDetails country={countries[0]} />
      </div>
    )
  } else if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter.
      </div>
    )
  } else {
    return (
      <div>
        <CountryList countries={countries} updateFilter={updateFilter} />
      </div>
    )
  }
}

export default Results