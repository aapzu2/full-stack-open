import React from 'react'

export default ({ filter, onFilter }) => (
    <div>
        find countries:<input onChange={onFilter} value={filter} />
    </div>
)

