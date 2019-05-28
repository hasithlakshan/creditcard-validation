import React, { Component } from 'react';

import CardDetails from "./components/CardDetails";
import Success from "./components/Success";
import Fail from "./components/Fail";

import Route from 'react-router-dom/Route';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {


  render() {
    return (
      <Router>
        <div className="container App">
          <Route path="/" exact strict component={CardDetails} />
          <Route path="/success" exact strict component={Success} />
          <Route path="/fail" exact strict component={Fail} />
        </div>
      </Router>

    );
  }


}
export default App;
