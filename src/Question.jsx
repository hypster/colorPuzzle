import React from 'react'
import './Question.css'
export default class Question extends React.Component {
  render() {
    let style = this.props.style
    let bgStyle = {}
    let wdStyle = {}
    if (style){
      bgStyle = {backgroundColor: style.backgroundColor}
      wdStyle = {width: style.width}
    }
    return (
      <div className='Question' 
        style={bgStyle}
      >
        {/* {this.props.style.backgroundColor} */}
        <progress className='progressBar'
        style={wdStyle} 
        >
        </progress>
        <h1>{this.props.children}</h1>
        <span className='timeLeft'>{this.props.timeLeft}</span>
        <span className='roundInfo'>{this.props.roundInfo}</span>
    {/* {this.props.timeLeft? <span>{this.props.timeLeft}</span>:''} */}
      </div>
    )
  }
}