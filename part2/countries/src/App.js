import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SearchForm from './components/SearchForm'
import Results from './components/Results'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  // Populate countries on load
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchFormChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <SearchForm value={searchTerm} handler={handleSearchFormChange} />
      <Results countries={filteredCountries} updateFilter={setSearchTerm} />
    </div>
  );
}

export default App;
