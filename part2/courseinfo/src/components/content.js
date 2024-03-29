import React from 'react'
import Part from './part'

const Content = (props) => {
    console.log("Content", props)
    const {parts} = props

    return (
        <>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </>
    )
}
  
export default Content  