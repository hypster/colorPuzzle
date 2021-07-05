import {combineReducers} from 'redux'
const NUMBER_CHOICE = 3
const timespan = 10000 //ms 
export const INTERVAL = 10 //ms
export const totalUpdates = timespan/INTERVAL
let initialGameState = {
  question: [], //rgb array
  choices: Array(NUMBER_CHOICE).fill([]), 
  correct: false,
  tried: [],
  saved: false
}

const newQuestion = (state, action) => {
  return {
    ...state,
    ...initialGameState
  }
}




function disabled(state=false, action){
  switch(action.type){
    case 'setDisable':
      return action.value
    default:
      return state
  }
}

const countdown = (state=totalUpdates,action) => {
  switch(action.type){
    case 'countdown':
      return --state;
    case 'resetCountdown':
      return totalUpdates
    default:
      return state
  }
}

const darkMode = (state=false, action) => {
  switch(action.type){
    case 'toggleDarkMode':
      return !state
    default:
      return state
  }
}

export default combineReducers({
  disabled,
  countdown,
  darkMode
})

