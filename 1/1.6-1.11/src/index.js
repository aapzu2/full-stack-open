import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const HYVA = 1
const NEUTRAALI = 0
const HUONO = -1

const Button = ({ otsikko, paina }) => (
    <button onClick={paina}>
        {otsikko}
    </button>
)

const Statistic = ({ otsikko, arvo }) => (
    <tr>
        <td>{otsikko}</td>
        <td>{arvo}</td>
    </tr>
)

class Statistics extends Component {
    getPalautteet = (arvo) => this.props.palautteet.filter(p => p === arvo)
    getKeskiarvo = () => {
        const palautteet = this.props.palautteet
        const maara = palautteet.length
        return palautteet.reduce((a, p) => {
            return p ? (a + p / maara) : a
        }, 0)
    }
    getPositiivisia = () => {
        const palautteet = this.props.palautteet
        const hyvat = this.getPalautteet(HYVA).length || 0
        return `${(hyvat / (palautteet.length) * 100) || 0} %`
    }
    render() {
        return (
            <div>
                <h3>statistiikka</h3>
                {this.props.palautteet.length ? (
                    <table>
                        <tbody>
                            <Statistic otsikko="hyvä" arvo={this.getPalautteet(HYVA).length} />
                            <Statistic otsikko="neutraali" arvo={this.getPalautteet(NEUTRAALI).length} />
                            <Statistic otsikko="huono" arvo={this.getPalautteet(HUONO).length} />
                            <Statistic otsikko="keskiarvo" arvo={this.getKeskiarvo()} />
                            <Statistic otsikko="positiivisia" arvo={this.getPositiivisia()} />
                        </tbody>
                    </table>
                ) : (
                        <p>ei yhtään palautetta annettu</p>
                    )}
            </div>
        )
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            palautteet: []
        }
    }


    lisaaPalaute = (arvo) => {
        this.setState({
            palautteet: [
                ...this.state.palautteet,
                arvo
            ]
        })
    }

    render() {
        return (
            <div>
                <h3>anna palautetta</h3>
                <Button otsikko="hyvä" paina={this.lisaaPalaute.bind(null, HYVA)} />
                <Button otsikko="neutraali" paina={this.lisaaPalaute.bind(null, NEUTRAALI)} />
                <Button otsikko="huono" paina={this.lisaaPalaute.bind(null, HUONO)} />
                <Statistics palautteet={this.state.palautteet} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)