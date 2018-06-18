import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
// import { cookies_services } from './services/cookies-service';
import { services } from './services/rare-service';
import Item from './Items/item'
import Order from './Orders/order'
import EditOrder from './Orders/edit-order'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    // this.state.currentUser = JSON.parse(cookies_services.getCookie('currUser'));
  }




  render() {
    return (
      <Router>

        <div className="App">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>

                <a className="navbar-brand">Brand</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li><Link to='/'>Orders<span className="sr-only">(current)</span></Link></li>
                  <li><Link to='/items'>Items</Link></li>
                  {/* <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="#">Action</a></li>
                      <li><a href="#">Another action</a></li>
                      <li><a href="#">Something else here</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#">Separated link</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#">One more separated link</a></li>
                    </ul>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
          <div className="_cont">
            <Switch>
              {/* <Route exact path="/login" render={
                  props => (
                    <Login />
                  )} />
                */}
              <Route exact path="/orders" render={
                props => (
                  <Order />
                )} />
                <Route exact path="/orders/edit/:id" render={
                props => (
                  <EditOrder />
                )} />
              <Route exact path="/items" render={
                props => (
                  <Item />
                )} />
              <Route exact path="/" component={Order} />
              <Route exact path="*" render={props => (
                <div className="pagenotfound"><h2>Page not found</h2></div>
              )} />
            </Switch>
          </div>
        </div>

      </Router >
    );
  }
}

export default App;
