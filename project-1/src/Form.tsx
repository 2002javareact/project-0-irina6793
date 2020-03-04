import React from 'react';

export default class Form extends React.Component{
    state = {
        firstName: '',
        lastName: '',
        username: '',
        password:'',
        email:'',
    };

    change = (e:any) => {
        this.setState({
           [e.target.name]: e.target.value 
    });
   };

   onSubmit = (e:any) => {
       e.preventDefault();
       this.props.onSubmit()
       console.log(this.state);
    };

    render() {
        return(
          <form>
              <input 
              name='firstName'
              placeholder='First Name'
              value={this.state.firstName} 
              onChange={e => this.change(e)} 
              />
              <br />
              <input 
              name='lastName'
              placeholder='Last Name'
              value={this.state.lastName} 
              onChange={e => this.change(e)} 
              />
              <br />
              <input 
              name='username'
              placeholder='Username'
              value={this.state.username} 
              onChange={e => this.change(e)} 
              />
              <br />
              <input 
              name='password'
              placeholder='Password'
              value={this.state.password} 
              onChange={e => this.change(e)} 
              />
              <br />
              <input 
              name='email'
              placeholder='Email'
              value={this.state.email} 
              onChange={e => this.change(e)} />
              <br />
              <button onClick={e => this.onSubmit(e)}>Submit</button>  
          </form>
        );
    }
}