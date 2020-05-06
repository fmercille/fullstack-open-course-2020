import React, { useState, useEffect } from 'react'

import Directory from './components/Directory'
import Filter from './components/Filter'
import NewEntryForm from './components/NewEntryForm'

import entriesService from './services/entries'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    console.log('effect')
    entriesService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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

    const newPersonObject = { name: newName, id: persons.length + 1, number: newNumber }

    entriesService.create(newPersonObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(newPersonObject))
        setNewName('')
        setNewNumber('')
      })
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