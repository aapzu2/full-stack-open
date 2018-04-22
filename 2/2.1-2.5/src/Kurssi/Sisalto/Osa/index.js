import React from 'react'

export default ({ osa: { nimi, tehtavia } }) => (
    <p>
        <span>{nimi}</span>
        {' '}
        <span>{tehtavia}</span>
    </p>
)