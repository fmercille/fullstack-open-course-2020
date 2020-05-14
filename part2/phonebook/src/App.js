import React, { useState, useEffect } from 'react'

import Directory from './components/Directory'
import Filter from './components/Filter'
import NewEntryForm from './components/NewEntryForm'
import Notification from './components/Notification'

import entriesService from './services/entries'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    entriesService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const displayNotification = (message) => {
    setNotificationMessage(message)

    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    // Validate phone number first
    if (newNumber.length < 3) {
      alert("You need to input a valid phone number")
      return;
    }

    if (persons.findIndex(e => e.name === newName) > -1) {
      if (window.confirm(`${newName} is already in the phonebook. Replace the old number with the new one?`)) {
        const changedPerson = { ...persons.find(e => e.name === newName), number: newNumber }
        entriesService.update(changedPerson.id, changedPerson)
          .then(returnedEntry => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedEntry.data))
            setNewName('')
            setNewNumber('')
            displayNotification(`Updated number for ${newName}`)
          })
      }

      return
    }

    const newId = newName + newNumber // Now that we can delete entries, we can't use the count as an ID
    const newPersonObject = { name: newName, id: newId, number: newNumber }

    entriesService.create(newPersonObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(newPersonObject))
        setNewName('')
        setNewNumber('')
        displayNotification(`Added ${newName}`)
      })
  }

  const deletePerson = (id) => {
    const name = persons.find(person => person.id === id).name

    if (window.confirm(`Delete ${name}?`)) {
      entriesService.delete(id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== id))
          displayNotification(`Deleted ${name}`)
        })
    }
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
      <Notification message={notificationMessage} />
      <Filter value={filterValue} handler={handleFilterValueChange} />
      <h2>Add a new entry</h2>
      <NewEntryForm addPersonHandler={addPerson} newNameValue={newName} newNameChangeHandler={handleNewNameChange} newNumberValue={newNumber} newNumberChangeHandler={handleNewNumberChange} />
      <h2>Numbers</h2>
      <Directory content={filteredPersons} deleteHandler={deletePerson} />
    </div>
  )
}

export default App