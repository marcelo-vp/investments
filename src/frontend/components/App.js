import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Investments from './Investments';
import Services from './Services';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path='/'>
                    <Investments />
                </Route>
                <Route path='/services'>
                    <Services />
                </Route>
            </Switch>
        </Router>
    );
}
