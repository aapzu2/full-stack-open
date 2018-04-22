import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'

export default ({ kurssi }) => (
    <div>
        <Otsikko otsikko={kurssi.nimi} />
        <Sisalto osat={kurssi.osat} />
    </div>
)