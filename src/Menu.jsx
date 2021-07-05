import React from 'react'
import './menu.css'
import { withRouter } from 'react-router-dom'
import { toggleDarkMode } from './actions'
import { connect } from "react-redux";
import Button from './Button'

class DropDown extends React.Component {

  onChange = (path) => () => {
    this.props.history.push(path)
  }

  render() {
    return (
      <div className={`Menu ${this.props.darkMode ? 'dark' : ''}`}>
        <div className={`fixBg ${this.props.darkMode ? 'dark' : ''}`}></div>
        <div className='contentWrap'>
          <div className='headerWrap'>
          <h1>MASTER IN DESIGN</h1>
            <Button className={`display ${this.props.darkMode ? 'daylight' : 'dark'}`} clickHandler={this.changeBg}>
              {this.props.darkMode ? 'Display daylight' : 'Display dark'}
            </Button>
            {/* <h1>CHOOSE A MODE</h1> */}
          </div>
          <div className='menuWrap'>
            <MenuItem path='/random'>Relax</MenuItem>
            <MenuItem path='/countdown'>Tense</MenuItem>
            <MenuItem path='/review'>Review</MenuItem>
          </div>
        </div>
      </div>
    )
  }
  changeBg = () => {
    this.props.dispatch(toggleDarkMode())
  }
}
export default connect(state => state)(DropDown)

class MenuItem extends React.Component {
  render() {
    return (
      <div onClick={() => this.clickHandler(this.props.path)}
        className='MenuItem'>
        <span>
          {this.props.children}
        </span>
      </div>
    )
  }
  clickHandler = (path) => {
    this.props.history.push(path)
  }
}

MenuItem = withRouter(MenuItem)
