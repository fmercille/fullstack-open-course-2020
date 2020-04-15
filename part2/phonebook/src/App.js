import React, { useState } from 'react'

import Directory from './components/Directory'
import Filter from './components/Filter'
import NewEntryForm from './components/NewEntryForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.findIndex(e => e.name === newName) > -1) {
      alert(`${newName}  is already in the phonebook`)
      return;
    }

    if (newNumber.length < 3) {
      alert("You need to input a valid phone number")
      return;
    }

    const newPersonObject = { name: newName, id: persons.length, number: newNumber }
    setPersons(persons.concat(newPersonObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value)
  }

  const filteredPersons = persons.filter(person => filterValue.trim().length ? person.name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0 : true)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} handler={handleFilterValueChange} />
      <h2>Add a new entry</h2>
      <NewEntryForm addPersonHandler={addPerson} newNameValue={newName} newNameChangeHandler={handleNewNameChange} newNumberValue={newNumber} newNumberChangeHandler={handleNewNumberChange} />
      <h2>Numbers</h2>
      <Directory content={filteredPersons} />
    </div>
  )
}

export default App