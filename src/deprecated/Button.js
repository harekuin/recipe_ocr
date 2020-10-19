import React, {useContext} from 'react'
import ItemContext from '../context/ItemContext'
import ListContext from '../context/ListContext'

function Button() {
    const { active, setActive } = useContext(ItemContext);
    const {list, setList} = useContext(ListContext);
    return (
        <div>
            <button onClick={() => setActive(true)}>
                Switch Language (Current: {active})
            </button>
        </div>
    )
}

export default Button
