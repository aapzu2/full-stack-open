import React from 'react'

export default ({ onAdd, onNimi, onNumero, newName, newNumero, adding }) => (
    <div>
        <h3>Lisää uusi</h3>
        {adding ? (
            <div>
                Adding new contact
            </div>
        ) : (
            <form onSubmit={onAdd}>
                <div>
                    nimi: <input onChange={onNimi} value={newName} />
                </div>
                <div>
                    numero: <input onChange={onNumero} value={newNumero} />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        )}
    </div>
)
