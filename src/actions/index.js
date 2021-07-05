
export const countdown = () => {
  return {
    type: 'countdown'
  }
}
export const resetCountdown = () => {
  return {
    type: 'resetCountdown'
  }
}

export const setDisable = (value) => {
  return {
    type: 'setDisable',
    value
  }
}

export const setNewQuestion = (question) => {
  return {
    type: 'setNewQuestion'
  }
}

export const toggleDarkMode = () => {
  return {
    type: 'toggleDarkMode'
  }
}