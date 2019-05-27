import React from 'react'
import { Link } from 'react-router-dom'

class SignUp extends React.Component {

  constructor() {
    super()
    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    }
  }

  fakeChange = () => {
    // this is only here to get rid of an error in the console
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e, signupInfo) => {
    e.preventDefault();
    fetch('http://localhost:3005/api/v1/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: signupInfo.username,
          email: signupInfo.email,
          password: signupInfo.password,
          password_confirmation: signupInfo.password_confirmation
        }
      })
    })
    .then(res => res.json())
    .catch((msg) =>  console.log(msg))
    .then(resObj => {
      if (resObj['error']) {
        const errorList = resObj['error'].split('-')
        errorList.splice(-1, 1)
        const errorsHTML = errorList.join("<br/><br/>")
        document.querySelector('#error-list').innerHTML = errorsHTML
      } else {
        localStorage.setItem('jwt', resObj['jwt'])
        this.props.history.push(`/users/${resObj['user']['id']}`)
      }
    })
  }

  render() {
    return (
      <div>
        <p>Sign Up</p>
        <form onSubmit={(e) => { this.handleSubmit(e, this.state) }}>
          <label htmlFor="email">Email: </label>
          <input onChange={this.handleChange}
            name="email"
            type="email"
            value={this.state.email}
            autoComplete="off"/>
          <br/><br/>
          <label htmlFor="username">Username: </label>
          <input onChange={this.handleChange}
            name="username"
            type="text"
            value={this.state.username}
            autoComplete="off"/>
          <br/><br/>
          <label htmlFor="password">Password: </label>
          <input onChange={this.handleChange}
            name="password"
            type="password"
            value={this.state.password}
            autoComplete="off"/>
          <br/><br/>
          <label htmlFor="password_confirmation">Confirm Password: </label>
          <input onChange={this.handleChange}
            name="password_confirmation"
            type="password"
            value={this.state.password_confirmation}
            autoComplete="off"/>
          <br/><br/>
          <input type="Submit" onChange={this.fakeChange} value="Sign Up"/>
        </form>
        <p id="error-list" style={{color:"red"}}></p>
        <p>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    )
  }
}

export default SignUp
