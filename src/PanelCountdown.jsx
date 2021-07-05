import React from 'react'
import * as PanelBasic from './PanelBasic'
import Button from './Button'
import * as action from './actions'
import Question from './Question'
import Choice from "./Choice";
import {Header} from './PanelBasic'
import { Link } from "react-router-dom";
import {totalUpdates} from './reducer'
import {connect} from 'react-redux'
import {INTERVAL} from './reducer'
class PanelCountdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      ...PanelBasic.state,
      total: PanelBasic.TOTAL_ROUND, //number of rounds for Q&A
      count: 0, //the current round
      showScoreButton: false, //control the score button display
      showScore: false, //control the score diplay
      numCorrect: 0, //store the number of correct answers in the rounds
      timer: null
    }
    this.state = Object.assign(this.state, this.getQuestionAndChoice())

    
  }
  componentDidMount(){
    this.startCountdown()  
  }
  componentWillUnmount(){
    console.log('in unmount')
    this.endCountdown()
    this.props.dispatch(action.setDisable(false))
    this.props.dispatch(action.resetCountdown())
  }
  
  getQuestionAndChoice =() => {
    return PanelBasic.generateQuestionAndChoice(this.state)
  }
  render = () => {
    const state = this.state
    const props = this.props
    const choices = this.renderChoices(state, props, this.handleChoiceClick, !!state.saved)
    let sHeader = ''
    if (this.state.correct){
      sHeader = 'Correct'
    } else if (this.props.countdown == 0){
      sHeader = 'Sorry, time out'
    }else if (this.state.saved){
      sHeader = 'Sorry, wrong'
    } else {
      sHeader = "What's this color?"
    } 
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
          <Question 
            style={this.computeQuestionStyle()} 
            timeLeft={this.getTimeLeft()}
            roundInfo={`${state.count+1}/${state.total}`}
            >
            {PanelBasic.listToRGB(state.question)}
          </Question>
          <Header correct={this.state.correct}>{sHeader}</Header>
          {choices}
          <div className='btn-group'>
            <Button 
              className={this.state.showScoreButton? 'hidden':''} 
              disabled = {!!this.state.timer}
              clickHandler={this.handleNextClick}>
                <i className="fas fa-chevron-right"></i> NEXT
            </Button>
            <Button 
              className={this.state.showScoreButton? '': 'hidden'} 
              clickHandler={() => this.setState({showScore: true})}><i className="fas fa-chevron-right"></i>
              VIEW SCORE
            </Button>
            <Link to='/'><Button><i className="fas fa-level-up-alt"></i> MENU</Button></Link>
          </div>
        </div>
      </div>
    )
  }
  renderChoices = ()=> {
    const state = this.state
    const props = this.props
    let showAnswer = this.state.saved
    const choices = state.choices.map((choice, i) =>{
      let highlight = false
      if (showAnswer && PanelBasic.isEqual(choice, this.state.question)){
        highlight = true
      }
      let oChoice =  (
        <Choice
          key={i}
          hidden={state.tried.includes(i)}
          index={i}
          color={`rgb(${choice.join(',')})`}
          correct={state.correct} 
          onClick={() => this.handleChoiceClick(i)}
          disabled = {props.disabled}
          highlight = {highlight}
          >
        </Choice>)
      return oChoice
    })
    return (
      <div className='Choices'>
        {choices}
      </div>
    )
  }

  
  computeStyle = () => {
    if (this.state.showScore)
      return
    return PanelBasic.computeStyle(this.state)
  }
  getTimeLeft = () => {
    if(this.props.countdown == 0)
      return 0
    return Math.floor(this.props.countdown * INTERVAL / 1000  + 1)
  }
  computeQuestionStyle(){
    let percent = 1 - this.props.countdown/totalUpdates
    let rTarget = 255
    let rSource = 100
    let gTarget = 100
    let gSource = 200
    let rColor = rSource + (rTarget - rSource) * percent
    let gColor = gSource + (gTarget - gSource) * percent
    let rgb = `rgb(${rColor}, ${gColor},0)`
    return {
      width: `${this.props.countdown/totalUpdates * 100}%`,
      backgroundColor: rgb
    }
  }
  startCountdown = () => {
    let timer = setInterval(() => this.onCountdown(), INTERVAL)
    this.setState({timer})
  }
  endCountdown = () => {
    clearInterval(this.state.timer)
    this.setState({timer: null})
    this.props.dispatch(action.setDisable(true))
    // if(!this.saved) {
    //   let toSave = {choices: this.state.choices,
    //     question: this.state.question
    //   }
    //   PanelBasic.save(toSave)
    //   this.setState({saved: true})
    // }
  }
  handleNextClick =() => {
    this.setState((state) =>({count: ++state.count}))
    PanelBasic.handleNextClick.call(this, this.getQuestionAndChoice)
    this.props.dispatch(action.resetCountdown())
    this.props.dispatch(action.setDisable(false))
    this.startCountdown()
  }
  handleChoiceClick = (index) => {
    if(this.state.tried.length > 0 || this.saved || !this.state.timer)
      return

    this.endCountdown()
    this.setState({disabled: false})
    if (PanelBasic.isEqual(this.state.choices[index], this.state.question)){      
      this.setState({correct: true})
      this.setState((state) => {
        return {
          numCorrect: ++state.numCorrect
        }
      }, () => {
        if(this.state.count + 1 == this.state.total){
          this.setState({showScoreButton: true})
        }
      })
      } else if(!this.state.saved){ //save the error only when user first clicks wrong
          let toSave = {choices: this.state.choices,
            question: this.state.question
          }
          PanelBasic.save(toSave)
          this.setState({saved: true})

          let tried = this.state.tried.slice()
          tried.push(index)
          this.setState({
            tried
          })
          
          if(this.state.count + 1 == this.state.total){
            this.setState({showScoreButton: true})
          }
    }
  }


  onCountdown = () => {
    if (this.props.countdown == 0){
      this.endCountdown()
      if(!this.state.saved){ //save the error only when user first clicks wrong
        let toSave = {choices: this.state.choices,
          question: this.state.question
        }
        PanelBasic.save(toSave)
        this.setState({saved: true})
      }
      if(this.state.count + 1 == this.state.total){
        this.setState({showScoreButton: true})
      }
      console.log('time stop')
    }else {
      this.props.dispatch(action.countdown())
    }
  }
  renderScore =() => {
    return <h1 className='message'>Your score: {`${this.state.numCorrect}/${this.state.total}`}</h1>
  }
}

export default connect(state=>state, null)(PanelCountdown)





