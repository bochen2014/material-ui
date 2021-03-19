// @flow weak

import React from "react";
import { render } from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RootRouter from "./Router";

function App(props) {
  return (
    <MuiThemeProvider {...props}>
      <RootRouter />
    </MuiThemeProvider>
  );
}

const rootEl = document.getElementById("app");

render(<App />, rootEl);
