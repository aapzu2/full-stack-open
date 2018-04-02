import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            pisteet: Array(anecdotes.length).fill(0)
        }
    }

    selectNext = () => this.setState({
        selected: Math.floor(Math.random() * anecdotes.length)
    })

    aanesta = () => {
        const pisteet = [...this.state.pisteet]
        const selected = this.state.selected
        pisteet[selected]++
        this.setState({
            pisteet
        })
    }

    getVotes = () => this.state.pisteet[this.state.selected]

    getHighestValue = () => this.state.pisteet.reduce((a, p, i) => {
        return p > this.state.pisteet[a] ? i : a
    }, 0)

    render() {
        const selected = this.state.selected
        const highest = this.getHighestValue()
        return (
            <div>
                <div>
                    <p>
                        {this.props.anecdotes[selected]}
                    </p>      
                    <p>
                        has {this.getVotes()} votes
                    </p>
                </div>
                <div>
                    <button onClick={this.aanesta}>vote</button>
                    <button onClick={this.selectNext}>next anecdote</button>
                </div>
                <h3>anecdote with most votes:</h3>
                <div>
                    <p>
                        {this.props.anecdotes[highest]}
                    </p>      
                    <p>
                        has {this.state.pisteet[highest]} votes
                    </p>
                </div>
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)