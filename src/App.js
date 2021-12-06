import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Navbar } from "react-bootstrap";
import Spaces from "./components/spaces";

function App() {
  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand>My spaces</Navbar.Brand>
      </Navbar>
      <Spaces />
    </div>
  );
}

export default App;
