import React,{useContext, useState} from 'react';
import logo from './cooking-meyoco.png';
//import './styles/App.css';
import './styles/style.css';
import Upload from './components/Upload';
import List from './components/List';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemContext from './context/ItemContext'
import ListContext from './context/ListContext';

function App() {

  const [active, setActive] = useState(false);
  const [list, setList] = useState(null);
  const value = { active, setActive };
  const value2 = { list, setList };

  return (
    <ItemContext.Provider value={value}>
      <ListContext.Provider value={value2}>
        <div className="App">
          <header>
            <img src={logo} className="logo" alt="logo" />
            <p>
              Welcome to Recipe OCR! Happy Cooking.
            </p>
          </header>
          {(!active) ?
            <div className='component-window'>
              <Upload />
            </div>
            :
            <div className='component-window'>
            <List />
            </div>
          }
        </div>
      </ListContext.Provider>
    </ItemContext.Provider>
  );
}

export default App;
