import React from 'react'

export default ({ persons, filter, onDelete }) => (
    <div>
        <h2>Numerot</h2>
        {persons
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter(p => {
                return new RegExp(filter.trim(), 'i').test(p.name)
            })
            .map(p => (
                <p key={p.name}>
                    <span>{p.name}</span>
                    {' '}
                    <span>{p.numero}</span>
                    <button onClick={() => onDelete(p)}>poista</button>
                </p>
            ))}
    </div>
)
