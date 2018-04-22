import React from 'react';

import * as services from '../../services/persons.js'

import Form from './Form'
import List from './List'
import Filter from './Filter'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumero: '',
            adding: false,
            filter: ''
        }
    }

    componentWillMount = () => {
        services.getAll()
            .then(({data}) => this.setState({
                persons: data
            }))
    }

    onAdd = (e) => {
        e.preventDefault()
        const newName = this.state.newName.trim()
        const newNumero = this.state.newNumero.trim()
        const newPerson = {
            name: newName,
            numero: newNumero
        }
        const existingPerson = this.state.persons.find(p => p.name === newName)
        if (!existingPerson) {
            this.setState({
                adding: true,
            })
            services.create(newPerson)
                .then(() => {
                    this.setState({
                        persons: [
                            ...this.state.persons,
                            newPerson,
                        ],
                        newName: '',
                        adding: false,
                    })
                })
            
        } else {
            window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`) && (
                services.update(existingPerson.id, newPerson)
                    .then(() => {
                        this.setState({
                            persons: [...this.state.persons.filter(p => p.id !== existingPerson.id), newPerson]
                        })
                    })
            )
        }
    }

    onFilter = (e) => {
        this.setState({
            filter: e.target.value
        })
    }

    onNimi = (e) => {
        this.setState({
            newName: e.target.value
        })
    }

    onNumero = (e) => {
        this.setState({
            newNumero: e.target.value
        })
    }

    onDelete = (person) => {
        window.confirm(`poistetaanko ${person.name}?`) && (
            services.remove(person.id)
                .then(() => {
                    this.setState({
                        persons: this.state.persons.filter(p => p.id !== person.id)
                    })
                })
        )
    }

    render() {
        return (
            <div>
                <h1>Puhelinluettelo</h1>
                <Filter 
                    filter={this.state.filter}
                    onFilter={this.onFilter}
                />
                <Form 
                    onAdd={this.onAdd}
                    onNimi={this.onNimi}
                    onNumero={this.onNumero}
                    newName={this.state.newName}
                    newNumero={this.state.newNumero}
                    adding={this.state.adding}
                />
                <List 
                    persons={this.state.persons}
                    filter={this.state.filter}
                    onDelete={this.onDelete}
                />
      </div>
        )
    }
}

export default App