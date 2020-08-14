import React from 'react';
import 'antd/dist/antd.css'
import '../styles/main.css';
import ListCampervans from '../containers/ListCampervans';
import Loading from '../containers/Loading'
import { Route, Switch } from "react-router-dom";

let App = () => (
  <div>
      {/*<Switch>*/}
      {/*    <Route path="/" component={ListCampervans} />*/}
      {/*</Switch>*/}
    <ListCampervans />
    <Loading />
  </div>
);


export default App;
