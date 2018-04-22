import React from 'react'

export default ({ filter, onFilter }) => (
    <div>
        rajaa näytettäviä: <input onChange={onFilter} value={filter} />
    </div>
)

