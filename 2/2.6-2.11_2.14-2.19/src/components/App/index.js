import React from 'react';

import * as services from '../../services/persons.js'

import Form from './Form'
import List from './List'
import Filter from './Filter'
import Notification from './Notification'

import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumero: '',
            adding: false,
            notification: null,
            filter: ''
        }
    }

    notify = (message, type) => {
        this.setState({
            notification: {
                message,
                type,
            }
        })
        clearTimeout(this.notificationTimeout)
        this.notificationTimeout = setTimeout(() => {
            this.setState({
                notification: null,
            })
        }, 4000)
    }

    componentWillMount = () => {
        services.getAll()
            .then(({data}) => this.setState({
                persons: data
            }))
    }

    onAdd = (e) => {
        e.preventDefault()
        const newPerson = {
            name: this.state.newName.trim(),
            numero: this.state.newNumero.trim()
        }
        const existingPerson = this.state.persons.find(p => p.name === newPerson.name)
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
                    this.notify(`lisättiin ${newPerson.name}`, 'success')
                })
                .catch((e) => {
                    this.notify(e.message, 'error')
                })
            
        } else {
            window.confirm(`${newPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`) && (
                services.update(existingPerson.id, newPerson)
                    .then(() => {
                        this.setState({
                            persons: [...this.state.persons.filter(p => p.id !== existingPerson.id), newPerson]
                        })
                        this.notify(`lisättiin ${newPerson.name}`, 'success')
                    })
                    .catch((e) => {
                        this.notify(e.message, 'error')
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
                .catch((e) => {
                    this.notify(e.message, 'error')
                })
        )
    }

    render() {
        return (
            <div>
                <h1>Puhelinluettelo</h1>
                {this.state.notification && <Notification notification={this.state.notification} />}
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