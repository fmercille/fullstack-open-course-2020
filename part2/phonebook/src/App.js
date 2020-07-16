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
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    entriesService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const displayNotification = (message) => {
    setNotificationMessage(message)

    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const displayError = (message) => {
    setErrorMessage(message)

    setTimeout(() => {
      setErrorMessage(null)
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
          .catch(error => { // The person was deleted
            displayError(`Error while updating the entry for ${newName}`)

            // Fetch the data from the server to synchronize the view
            entriesService
              .getAll()
              .then(response => {
                setPersons(response.data)
              })
          })
      }

      return
    }

    const newPersonObject = { name: newName, number: newNumber }

    entriesService.create(newPersonObject)
      .then(response => {
        setPersons(persons.concat(newPersonObject))
        setNewName('')
        setNewNumber('')
        displayNotification(`Added ${newName}`)
      })
      .catch(error => {
        displayError(error.response.data.error)
      })
  }

  const deletePerson = (id) => {
    const name = persons.find(person => person.id === id).name

    if (window.confirm(`Delete ${name}?`)) {
      entriesService.delete(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          displayNotification(`Deleted ${name}`)
        })
        .catch(error => { // The person was deleted
          displayError(`Error while deleting the entry for ${name}`)

          // Fetch the data from the server to synchronize the view
          entriesService
            .getAll()
            .then(response => {
              setPersons(response.data)
            })
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
      <Notification message={notificationMessage} messageType='notice' />
      <Notification message={errorMessage} messageType='error' />
      <Filter value={filterValue} handler={handleFilterValueChange} />
      <h2>Add a new entry</h2>
      <NewEntryForm addPersonHandler={addPerson} newNameValue={newName} newNameChangeHandler={handleNewNameChange} newNumberValue={newNumber} newNumberChangeHandler={handleNewNumberChange} />
      <h2>Numbers</h2>
      <Directory content={filteredPersons} deleteHandler={deletePerson} />
    </div>
  )
}

export default App