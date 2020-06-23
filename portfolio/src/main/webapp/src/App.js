import React, { Component } from "react";
import Counters from "./components/counters";
import NavBar from "./components/navbar";
import Value from "./components/value";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Counters />
          <Value />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
