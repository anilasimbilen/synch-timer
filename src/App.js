import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CountdownPicker from './screens/CountdownPicker';
import Countdown from './screens/Countdown';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/timer/:hours/:minutes/:seconds/:starting" render={props => {
          return <Countdown {...props.match.params} />
        }} />
          <Route path="/" render={(props) => {
              return <CountdownPicker />
          }}/>
      </Switch>
    </Router>
  );
}

export default App;
