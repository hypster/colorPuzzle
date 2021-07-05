import React from 'react'
import './Choice.css'
export default class Choice extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    let style = null
    if (this.props.correct){
      style = {backgroundColor: 'white'}
    } else {
      style = {backgroundColor: this.props.color}
    }
    let highlight = this.props.highlight? 'highlight': ''
    return (
      <div 
      className={`Choice ${highlight} ${this.props.hidden? 'Choice-hidden':''}`} 
      style={style} 
      onClick={!this.props.disabled? this.props.onClick: ()=>{console.log('sorry time out.')}}>
      </div>
    )
  }
}