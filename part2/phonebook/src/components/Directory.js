import React from 'react'

const Directory = ({ content }) => (
  <div>
    {content.map(person =>
      <div key={person.name}>{person.name} {person.number}</div>
    )}
  </div>
)

export default Directory