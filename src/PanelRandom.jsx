import './panel.css'
import * as PanelBasic from './PanelBasic'
import {generateRGB } from './util'
import React from 'react'
import Question from './Question'
import Button from './Button'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
const Header = PanelBasic.Header
export class PanelRandom extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      ...PanelBasic.state,
      total: PanelBasic.TOTAL_ROUND, 
      count: 0, 
      showScoreButton: false,
      showScore: false,
      numCorrect: 0,
    }
    
    this.state = Object.assign(this.state, this.getQuestionAndChoice())
  }
  
  getQuestionAndChoice = ()=>{
    return PanelBasic.generateQuestionAndChoice(this.state)
  }

  render = render
  
  computeStyle = computeStyle

  handleChoiceClick = handleChoiceClick.bind(this)

  
  handleNextClick = () => {
    PanelBasic.handleNextClick.call(this,this.getQuestionAndChoice)
    this.setState((state) => ({count: ++state.count}))
  }  


  showScore =() => {
    this.setState({showScore: true})
  }

  renderScore = renderScore
}
export const render = function() {
  const state = this.state
  const choices = PanelBasic.renderChoices(state, this.props, this.handleChoiceClick)
  if(this.state.showScore){
    return (
      <div className='panel'>
        <div className='innerPanel'>
          {this.renderScore()}
          <div className='btn-group'>
            <Link to='/'><Button><i className="fas fa-level-up-alt"></i> MENU</Button></Link>
          </div>
        </div>
      </div>
    )
  }
  return (
      
    <div className={`panel ${this.props.darkMode? 'dark':''}`} style={this.computeStyle()}>
      <div className={this.state.showScore?'hidden':''}>
        <Question>
          {PanelBasic.listToRGB(this.state.question)}
        </Question>
        <span className="process">{`${this.state.count+1}/${this.state.total}`}</span>
        <Header correct={this.state.correct}>
          {this.state.correct ? 'Correct' : `What's this color?`}
        </Header>
        {choices}
        <div className='btn-group'>
          <Button 
            className={this.state.showScoreButton? 'hidden':''} 
            disabled = {!this.state.correct}
            clickHandler={this.handleNextClick}>
              <i className="fas fa-chevron-right"></i> NEXT
          </Button>
          <Button 
            className={this.state.showScoreButton? '': 'hidden'} 
            clickHandler={this.showScore}><i className="fas fa-chevron-right"></i>
            VIEW SCORE
          </Button>
          <Link to='/'><Button><i className="fas fa-level-up-alt"></i> MENU</Button></Link>
        </div>
      </div>
    </div>
  )
}


export const computeStyle = function() {
  if(this.state.showScore)
    return
  return PanelBasic.computeStyle(this.state)
}

export const renderScore =function() {
  return <h1 className='message'>Your score: {`${this.state.numCorrect}/${this.state.total}`}</h1>
}

export const handleChoiceClick = function (index) { //handle choice click
  PanelBasic.handleChoiceClick.call(this, index)
  if (PanelBasic.isEqual(this.state.choices[index], this.state.question)){
    if (this.state.tried.length == 0) {
      this.setState(state=>({numCorrect: ++state.numCorrect}))
    }
    if(this.state.count+1 == this.state.total){
      this.setState({showScoreButton: true})
    }
  }
}

export default connect((state) => state)(PanelRandom)