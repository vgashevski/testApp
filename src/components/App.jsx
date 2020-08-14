import React from 'react';
import 'antd/dist/antd.css'
import '../styles/main.css';
import ListCampervans from '../containers/ListCampervans';
import ItemInfo from '../containers/ItemInfo';
import PageNotFound from "./PageNotFound";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Provider} from "react-redux";

let App = () => (
    <Router>
    <Switch>
        <Route exact path="/" component={ListCampervans} />
        <Route path="/item" component={ItemInfo} />
        <Route component={PageNotFound} />
    </Switch>
    </Router>
);


export default App;
