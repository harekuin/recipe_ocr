import React, { useState, useContext } from 'react';
import ItemForm from './ItemForm';
import Item from './Item';
import ItemContext from '../context/ItemContext'
import ListContext from '../context/ListContext'
import {VscChevronLeft} from 'react-icons/vsc'

function List() {
  const { active, setActive } = useContext(ItemContext);
  const {list, setList} = useContext(ListContext);

  {/* Receives default values for initial ingredient list from Upload.
  Parses information to be part of the initial list.*/}
  const val = list.split("\n");
  var filtered = val.filter(function (el) {
    return el !== "";
  });

  const myList = (filtered.map((item) => 
    ({
      text : item,
      id : Math.floor(Math.random()*10000)
    })
  ));

  const [items, setItems] = useState(myList);

  const addItem = item => {
    if (!item.text || /^\s*$/.test(item.text)) {
      return;
    }
    const newItems = [item, ...items];
    setItems(newItems);
  };

  const removeItem = id => {
    const removedArr = [...items].filter(item => item.id !== id);
    setItems(removedArr);
  };
  
  return (
    <>
    <div>
      <VscChevronLeft
        size="60px"
        onClick={() => setActive(false)}
        className='return-icon'
      />
      </div>
      <h1 className="App">Ingredients</h1>
      <ItemForm onSubmit={addItem} />
      <Item
        items={items}
        removeItem={removeItem}
      />
    </>
  );
}

export default List
