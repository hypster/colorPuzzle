import React from 'react'
export default class Button extends React.Component {
  render(){
    return (
    <button 
      className={`btn ${this.props.className}`}
      onClick={this.props.clickHandler}
      disabled = {this.props.disabled}>
        {this.props.children}
      </button>
    )
  }
}