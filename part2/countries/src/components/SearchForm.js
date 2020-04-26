import React from 'react'

const SearchForm = ({ value, handler }) => (
  <div>
    Find Countries: <input onChange={handler} />
  </div>
)

export default SearchForm