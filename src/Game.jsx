import React from 'react';
import Panel from './Panel'
import Menu from './Menu'
import './App.css';
export default class Game extends React.Component{
  
  render(){
    return (
      <div className="game">
        <Menu></Menu>
        <Panel></Panel>
      </div>
    );
  }
}
