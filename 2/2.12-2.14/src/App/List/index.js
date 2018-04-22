import React from 'react'

export default ({ countries, onClick }) => {
    return (
        <div>
            {countries.map(c => (
                <p key={c.name} onClick={() => onClick(c)} >
                    <span>{c.name}</span>
                </p>
            ))}
        </div>
    )
}
