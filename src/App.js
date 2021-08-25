import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import manage from './manage'
import login from './b_login'
function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={login}/>
          <Route path="/manage" component={manage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
