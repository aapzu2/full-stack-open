import React from 'react';
import axios from 'axios'

import List from './List'
import Country from './Country'
import Filter from './Filter'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            selectedCountry: null, 
            filter: ''
        }
    }

    componentWillMount = () => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(({data}) => this.setState({
                countries: data
            }))
    }

    onFilter = (e) => {
        this.setState({
            filter: e.target.value,
            selectedCountry: null,
        })
    }

    onCountryClick = (country) => {
        this.setState({
            selectedCountry: country,
        })
    }

    render() {
        const filtered = this.state.countries.filter(p => {
            return new RegExp(this.state.filter.trim(), 'i').test(p.name)
        })
        return (
            <div>
                <Filter 
                    filter={this.state.filter}
                    onFilter={this.onFilter}
                />
                {(this.state.selectedCountry && (
                    <Country country={this.state.selectedCountry} />
                )) || (filtered.length === 1 && (
                    <Country country={filtered[0]} />
                )) || (filtered.length <= 10 && (
                    <List countries={filtered} onClick={this.onCountryClick} />
                )) || (
                    <span>too many matches, specify another filter</span>
                )}
      </div>
        )
    }
}

export default App