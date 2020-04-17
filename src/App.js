import React, { Component } from "react";
import {connect} from 'react-redux'

import * as actions from './store/actions/index';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/Checkout/Checkout";
import { Route, Switch, withRouter } from "react-router-dom";
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/auth"  component={Auth} />
            <Route path="/logout" component={Logout} />
          
          </Switch>
        </Layout>
      </div>
    );
  }
}
 const mapDispatchToProps =dispatch => {
   return {
     onTryAutoSignup: () => dispatch(actions.authCheckState)
   }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
