import React from 'react'
import Question from './Question'
import Choice from './Choice'
import Button from './Button'
import './panel.css'
import './button.css'
import {Link} from 'react-router-dom'
import { generateRGB } from "./util";
// import {connect} from 'react-redux'

export const TOTAL_ROUND  = 10
// when user click a choice
export function handleChoiceClick(index) {
  if (this.state.correct || this.state.tried.includes(index)) //if game is over or click on previous answer
    return
  if (isEqual(this.state.choices[index], this.state.question)) {
    this.setState({
      correct: true
    })
  } else {
    if(!this.state.saved){ //save the error only when user first clicks wrong
      let toSave = {choices: this.state.choices,
        question: this.state.question
    }
    save(toSave)
    this.setState({saved: true})
    }
    let tried = this.state.tried.slice()
    tried.push(index)
    this.setState({
      tried
    })
  }
}

export const generateQuestionAndChoice = (state)=>{
  let choices = state.choices.map(_ => generateRGB())
  let i = Math.floor(Math.random() * state.choices.length)
  let question = choices[i]
  return {question, choices}
}


export const  NUMBER_CHOICE = 3
export const state = { 
    question: [], //rgb array
    choices: Array(NUMBER_CHOICE).fill([]), 
    correct: false,
    tried: [],
    saved: false
}


// export const componentDidMount() => {
//     this.props.dispatch({type: 'setDisable', value: false})
//     this.handleNext()
//   }

export const renderChoices = (state, props, onClick) => {
    const choices = state.choices.map((choice, i) =>(
      <Choice
          key={i}
          hidden={state.tried.includes(i)}
          index={i}
          color={`rgb(${choice.join(',')})`}
          correct={state.correct} 
          onClick={() => onClick(i)}
          disabled = {props.disabled}>
        </Choice>
        ));
        return (
          <div className='Choices'>
            {choices}
          </div>)
  }
  
  export const computeStyle= (state) => {
    if (state.correct) {
      return {backgroundColor: listToRGB(state.question)}
    } 
  }
  
  export const listToRGB= (list) => {
    return `RGB(${list.join(',')})`
  }

  
  export const render = (state, props, onClick) => {
    const choices = this.renderChoices(state, props, onClick)
    return (
      <div className='panel' style={computeStyle()}>
        <Question>
          {listToRGB(state.question)}
        </Question>
        {state.total && 
          (<span className="process">{`${state.count+1}/${state.total}`}</span>)
        }
        {props.records && 
          (<span className="process">{props.records.length} exercises remaining</span>)
        }
        <Header>
          {state.correct ? 'Correct' : `What's this color?`}
        </Header>
        {choices}
        <Button clickHandler={onClick}><i className="fas fa-chevron-right"></i> NEXT</Button>
        <Link to='/'><Button><i className="fas fa-level-up-alt"></i> MENU</Button></Link>
      </div>
    )
  }
  //check whether two arrays are same
  export const isEqual = (arrA,arrB) => {
    if(arrA.length != arrB.length){
      return false
    }
    return arrA.every((item, i) => {
      return arrB[i] == item
    })
  }
  

  //handle when user click for next question
  export function handleNextClick (getQuestionAndChoice) { 
    let {question, choices} = getQuestionAndChoice()
    this.setState({
      choices,
      question,
      tried: [],
      correct: false, 
      saved: false //whether saved wrong answer 
    })
  }

  export const save = function (toSave) {
      let arr = JSON.parse(localStorage.getItem('mistakes'))
      if(!arr){
        arr = []
      }
      arr.push(toSave)
      localStorage.setItem('mistakes', JSON.stringify(arr))
  }
  




export class Header extends React.Component{
  render(){
    return (
    <h1 className={`text ${this.props.correct? 'correct': ''}`}>
      {this.props.children}
    </h1>)
  }
}

