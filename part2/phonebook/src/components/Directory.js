import React from 'react'

const Directory = ({ content, deleteHandler }) => (
  <div>
    {content.map(person =>
      <div key={person.name}>{person.name} {person.number}&nbsp;<button onClick={() => deleteHandler(person.id)}>Delete</button></div>
    )}
  </div>
)

export default Directory