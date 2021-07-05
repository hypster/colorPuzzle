import React from 'react'
import * as PanelBasic from './PanelBasic'
import Button from './Button'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { render,computeStyle,renderScore,handleChoiceClick } from "./PanelRandom";
import Question from './Question'
const Header = PanelBasic.Header
export class PanelReview extends React.Component{
  constructor(props){
    super(props)
    let history = JSON.parse(localStorage.getItem('mistakes'))
    if (!history)
      history = []
    this.state = {history}
    this.state = {
      ...PanelBasic.state,
      ...this.getQuestionAndChoice(0),
      history,
      total: history.length,
      count: 0
    }
  }
  getQuestionAndChoice = (index) => {
    return Object.assign({},this.state.history[index])
  }

  //when user clicks an answer
  handleClick = (index) => { 
    if(!this.state.tried.length) //consume one record as soon as when user clicks an answer
      this.props.afterRead()
    super.handleClick(index)
  }

  gotoNextState(count){
    this.setState({
      count,
     ...this.getQuestionAndChoice(count),
     tried: [],
     correct: false, 
     saved: false
    })
  }
  handleNextClick = () => {
    let cnt
    if (this.state.count+1 == this.state.history.length) {
      cnt = 0
    } else {
      cnt = ++this.state.count
    }
    this.gotoNextState(cnt)
    
  }

  handlePreviousClick =() => {
    let cnt = 0
    if(this.state.count == 0) {
      cnt = this.state.history.length-1
    } else {
      cnt = --this.state.count
    }
    this.gotoNextState(cnt)
  }

  handleChoiceClick = (index) => {
    PanelBasic.handleChoiceClick.call(this, index)
  }


  clearHistory = () => {
    this.setState({history: []})
    localStorage.setItem('mistakes', JSON.stringify([]))
  }

  renderScore = renderScore
  
  render = () => {
    if (!this.state.history.length) {
      return (
      <div className='panel' style={this.computeStyle()}>
        <div className ='innerPanel'>
          <h1 className='message'>SORRY, NO EXERCISES TO REVIEW</h1>
          <div className='btn-group'>
          <Link to='/'><Button><i className="fas fa-level-up-alt"></i> MENU</Button></Link>
          </div>
        </div>
        </div>)
    }
    const state = this.state
    const props = this.props
    const choices = PanelBasic.renderChoices(state, props, this.handleChoiceClick)
    return (
      <div className={`panel ${this.props.darkMode? 'dark':''}`} style={this.computeStyle()}>
        <Question>
          {PanelBasic.listToRGB(state.question)}
        </Question>
        {state.total && 
          (<span className="process">{`${state.count+1}/${state.total}`}</span>)
        }
        <Header correct={this.state.correct}>
          {state.correct ? 'Correct' : `What's this color?`}
        </Header>
        {choices}
        <div className='btn-group'>
          <Button clickHandler={this.handlePreviousClick}><i className="fas fa-chevron-left"></i> PREVIOUS</Button>
          <Button clickHandler={this.handleNextClick}><i className="fas fa-chevron-right"></i> NEXT</Button>
          <Link to='/'><Button><i className="fas fa-level-up-alt"></i> MENU</Button></Link>
          <Button clickHandler={this.clearHistory}><i className="fas fa-broom"></i> CLEAR HISTORY</Button>
        </div>
      </div>
    )
  }
  computeStyle = () => {
    if (!this.state.history.length)
      return
    return PanelBasic.computeStyle(this.state)
  }
}

export default connect(state => state)(PanelReview)