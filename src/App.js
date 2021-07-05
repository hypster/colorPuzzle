import React from 'react';
import './App.css';
import Menu from './Menu'
import PanelRandom from './PanelRandom'
import PanelReview from './PanelReview'
import PanelCountdown from './PanelCountdown'


import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import {Provider, connect} from 'react-redux'


class App extends React.Component {
  
  render(){
    return (
        <Router>
          <div className={`AppWrap ${this.props.darkMode? 'dark':''}`}>
            <div className={`App ${this.props.darkMode? 'dark':''}`}>
              <Route exact path='/'>
                <Menu></Menu>
              </Route>
              <Route path='/random'>
                <PanelRandom></PanelRandom>
              </Route>
              <Route path='/review'>
                <PanelReview 
                  afterRead = {this.removeOne}></PanelReview>
              </Route>
              <Route path='/countdown'>
                <PanelCountdown></PanelCountdown>
              </Route>
            </div>

          </div>
        </Router>
      );
  }
  componentDidMount(){

  }
  //remove one record from history and update state
  removeOne = () => {
    if (this.state.history.length > 0){
      this.setState((state,prop) => {
        let history = state.history.slice(1)
        localStorage.setItem('mistakes', JSON.stringify(history))
        return {history}
      })
    }
  }
  saveHandler = (toSave) => {
    this.setState((state, prop) => {
      let history = [...state.history, toSave]
      localStorage.setItem('mistakes', JSON.stringify(state.history))
      return {history}
    })
  }
}

export default connect(state=>state, null)(App)
