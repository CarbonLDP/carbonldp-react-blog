import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home';
import Blog from './components/blog';
import Layout from './components/layout';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/blog' component={Blog}/>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;