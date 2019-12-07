import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      age: "",
      email: "",
      dob: "",
      searchTerm: ''
    }
  }

  onNameHangler = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  onAgeHandler = (event) => {
    this.setState({
      age: event.target.value
    })
  }

  onEmailHandler = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  onDobHandler = (event) => {
    this.setState({
      dob: event.target.value
    })
  }

  onAddHandler = event => {
    event.preventDefault();

    const { name, age, email, dob } = this.state;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newList = [...users, { name, age, email, dob }];

    localStorage.setItem('users', JSON.stringify(newList));
  }

  onUpdateHandler = e => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.name === this.state.searchTerm);
    const { name, age, email, dob } = this.state;

    users.splice(userIndex, 1, { name, age, email, dob });
    localStorage.setItem('users', JSON.stringify(users));
    this.setState({ name: '', age: '', email: '', dob: '' });
  }

  onDeleteHandler = e => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.name === this.state.name);

    users.splice(userIndex, 1);
    localStorage.setItem('users', JSON.stringify(users));
    this.setState({ name: '', age: '', email: '', dob: '' });
  }

  onSearch = e => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.name.indexOf(this.state.searchTerm) === 0);

    this.setState({ ...user, searchTerm: '' });
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.onSubmit} className="body" >

          <div><label className="label">Name : </label>
            <input type="text" placeholder="Enter your name" value={this.state.name} onChange={this.onNameHangler} required/></div>

          <div><label className="label">Age : </label>
            <input type="number" placeholder="Enter your age " value={this.state.age} onChange={this.onAgeHandler} required/></div>

          <div><label className="label">Email : </label>
            <input type="email" placeholder="Enter your email" value={this.state.email} onChange={this.onEmailHandler} required/></div>

          <div><label className="label">DOB : </label>
            <input type="date" placeholder="Enter your DOB" value={this.state.dob} onChange={this.onDobHandler} required/></div>

          <div><input type="submit" value="ADD" onClick={this.onAddHandler} className="btn" style={{ margin: "20px 0 0 50px" }} required/>
            <input type="submit" value="UPDATE" onClick={this.onUpdateHandler} className="btn" style={{ margin: "20px 0 0 50px" }} required/>
            <input type="submit" value="DELETE" onClick={this.onDeleteHandler} className="btn" style={{ margin: "20px 0 0 50px" }} required/></div>

        </form>

        <div><input type="text" placeholder="Please search the name" onChange={e => {
          this.setState({ searchTerm: e.currentTarget.value });
        }} style={{ margin: "50px 0 0 50px" }} /><button onClick={this.onSearch} >Search</button></div>
      </div>
    );
  }
}
