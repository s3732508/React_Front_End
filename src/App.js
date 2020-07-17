import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Orders from './Components/Orders'

function App() {
   

    return (

         <Router>
             <Switch>
                 <Route path="/" exact component={Orders} />
                 <Route path="/orders" exact component={Orders} />
        
             </Switch>
         </Router>

    );
}

export default App;


