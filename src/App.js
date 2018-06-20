import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
    	<img width="75" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: 10, verticalAlign:'top', width: 650}}>
      	<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
        	{props.name}
        </div>
        <div>{props.bio}</div>
      </div>
    </div>
  );
};

const CardList = (props) =>{
	return (
  	<div>
    	{props.cards.map(card => <Card key={card.id} {...card}/>)}
    </div>
  );
};

class Form extends React.Component{
	state = { userName: '' }
	handleSubmit = (event) => {
  	event.preventDefault(); //avoid default browser submit
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    	.then(resp => {
      	this.props.onSubmit(resp.data);
        this.setState({ userName: '' });
      })
  };
  
	render (){
  	return (
    	<form style={{margin: '1em'}} onSubmit={this.handleSubmit}>
      	<input type="text" placeholder="Github username" required
        //ref={(input) => this.userNameInput = input} //one approach type
        value={this.state.userName}
        onChange={(event) => this.setState({ userName: event.target.value })}
        />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component{
	state = {
  	cards: []
  };
  
  addNewCard = (cardInfo) => {
  	this.setState(prevState => ({
    	cards: prevState.cards.concat(cardInfo)
    }));
  };
  
	render(){
  	return (
    	<div>
      	<Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards}/>
      </div>
    );
  }
}

export default App;
