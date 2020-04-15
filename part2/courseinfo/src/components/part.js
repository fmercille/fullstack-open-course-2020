import React from 'react'

const Part = (props) => {
    console.log("Part", props)
    const {name, exercises} = props
    
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

export default Part