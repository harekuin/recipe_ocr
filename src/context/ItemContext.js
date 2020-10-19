import React, { createContext } from "react";
import PropTypes from "prop-types";

// set the defaults. Context allows to toggle between Upload and List hooks
const ItemContext = React.createContext({
  active: false,
  setActive: () => {}
});

export default ItemContext; 