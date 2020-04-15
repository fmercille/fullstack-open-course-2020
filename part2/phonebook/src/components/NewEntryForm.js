import React from 'react'

const NewEntryForm = (props) => (
  <div>
    <form onSubmit={props.addPersonHandler}>
      <div>name: <input value={props.newNameValue} onChange={props.newNameChangeHandler} /></div>
      <div>number: <input value={props.newNumberValue} onChange={props.newNumberChangeHandler} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
)

export default NewEntryForm