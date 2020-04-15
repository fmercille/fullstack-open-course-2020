import React from 'react'

const Total = ({parts}) => {
    const total = parts.reduce((s, p) => s += p.exercises, 0)
    
    return (
      <p><b>Total of {total} exercices</b></p>
    )
}
  
export default Total