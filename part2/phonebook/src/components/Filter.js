import React from 'react'

const Filter = ({ value, handler }) => (
    <div>
        Filter names: <input value={value} onChange={handler} />
    </div>
)

export default Filter