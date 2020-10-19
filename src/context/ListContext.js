import React from "react";

// set the defaults. List context receives string of ingredients to be sent from Upload to List
const ListContext = React.createContext({
  list: null,
  setList: () => {}
});

export default ListContext;