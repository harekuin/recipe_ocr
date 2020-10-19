import React,{ useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri';

function Item({ items, completeitem, removeitem, updateitem }) {    
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });
    
  return items.map((item, index) => (
    <div className='item'>
      <div className={item.isComplete ? 'item row complete' : 'item row'} key={index}>
        <div key={item.id} onClick={() => completeitem(item.id)}>
          {item.text}
        </div>
        <div className='icons'>
        <RiCloseCircleLine onClick={() => removeitem(item.id)} />
      </div>
    </div>
  </div>
  ));
}

export default Item


