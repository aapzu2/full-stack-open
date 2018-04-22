import React from 'react'

export default ({ country }) => {
    return (
        <div>
            <h1>{country.name} {country.nativeName !== country.name ? country.nativeName : ''}</h1>
            <p>capital: <span>{country.capital}</span></p>
            <p>population: <span>{country.population}</span></p>
            <img alt="flag" width={400} src={country.flag} />
        </div>
    )
}
