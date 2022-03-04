import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

export default class App extends Component {
  Pagesize = 12;
  country = "in";
  state={progress:0}
  setprogress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
          height={3}
        color='#f11946'
        progress={this.state.progress}
      />
          <Switch>
            <Route exact path="/"><News setprogress={this.setprogress} key="general" pagesize={this.Pagesize} country={this.country} category="general" /></Route>
            <Route exact path="/business"><News setprogress={this.setprogress} key="business" pagesize={this.Pagesize} country={this.country} category="business" /></Route>
            <Route exact path="/entertainment"><News setprogress={this.setprogress} key="entertainment" pagesize={this.Pagesize} country={this.country} category="entertainment" /></Route>
            <Route exact path="/health"><News setprogress={this.setprogress} key="health" pagesize={this.Pagesize} country={this.country} category="health" /></Route>
            <Route exact path="/science"><News setprogress={this.setprogress} key="science" pagesize={this.Pagesize} country={this.country} category="science" /></Route>
            <Route exact path="/sports"><News setprogress={this.setprogress} key="sports" pagesize={this.Pagesize} country={this.country} category="sports" /></Route>
            <Route exact path="/technology"><News setprogress={this.setprogress} key="technology" pagesize={this.Pagesize} country={this.country} category="technology" /></Route>
          </Switch>
        </Router>
      </div>
      </>
    )
  }
}