import React, { useState, useEffect, useRef } from 'react';

function ItemForm(props) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };
  
  return (
    <div className="item">
    <form onSubmit={handleSubmit} className='form'>
          <input
            placeholder='Add an ingredient'
            value={input}
            onChange={handleChange}
            name='text'
            className='input'
            ref={inputRef}
          />
          <button onClick={handleSubmit}>
            Add ingredient
          </button>
    </form>
    </div>
  );
}
export default ItemForm;