import React from 'react'
import Osa from './Osa'

export default ({ osat }) => (
    <div>
        {osat.map(o => (
            <Osa osa={o} key={o.id} />
        ))}
        <p>yhteensä {osat.reduce((a, v) => a + v.tehtavia, 0)} tehtävää</p>
    </div>
)