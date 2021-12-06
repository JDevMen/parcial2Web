import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Navbar } from "react-bootstrap";
import Spaces from "./components/spaces";
import { FormattedMessage } from "react-intl";

function App() {
  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand>
          <h2 style={{ marginLeft: "2rem" }}>
            <FormattedMessage id="spaces" />
          </h2>
        </Navbar.Brand>
      </Navbar>
      <Spaces />
    </div>
  );
}

export default App;
