import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({ kurssi }) => (
    <h1>{kurssi}</h1>
)

const Osa = ({ osa }) => (
    <p>{osa.nimi} {osa.tehtavia}</p>
)

const Sisalto = ({ osat }) => (
    osat.map(o => <Osa osa={o}/>)
)

const Yhteensa = ({ osat }) => (
    <p>yhteensä {osat.reduce((yht, osa) => yht + osa.tehtavia, 0)} tehtävää</p>
)

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
      }
    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)