import React from 'react'

export default ({ notification }) => (
    <div className={`notification ${notification.type}`}>
        {notification.message}
    </div>
)
