import React from 'react';
import { Accounts } from 'meteor/accounts-base';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      user: this.props.user,
      error: null,
      form: "login"
    };
  }

  _changeForm(event) {
    event.preventDefault();
    var clicked = event.target.value;

    var email = document.getElementById("loginEmail");
    var password = document.getElementById("loginPassword");
    var confirmPassword = document.getElementById("confirmPassword");

    email.value = null;
    password.value = null;
    if (confirmPassword) confirmPassword.value = null;

    if (this.state.form == "login" && clicked != "register") {
      $(".selected").removeClass("selected");
      $(event.target).addClass("selected");
      this.setState({ form: "register" });
    }

    if (this.state.form == "register" && clicked != "login") {
      $(".selected").removeClass("selected");
      $(event.target).addClass("selected");
      this.setState({ form: "login" });
    }
  }

  _handleSubmit(event) {
    event.preventDefault();

    if (this.state.form == "login") {
      var email = document.getElementById("loginEmail").value;
      var password = document.getElementById("loginPassword").value;

      if ((email && email.length > 0) && (password && password.length > 0)) {
        Meteor.loginWithPassword(email.trim(), password.trim(), (error) => {
          if (error) {
            console.log(error);
            this.setState({error: "Error: " + error.reason});
            return false;
          } else {
            console.log("Logged In: " + Meteor.userId());
            return true;
          }
        });
      } else {
        this.setState({error: "Error: Empty email or password"});
        return false;
      }
    }

    if (this.state.form == "register") {
      var email = document.getElementById("loginEmail").value;
      var password = document.getElementById("loginPassword").value;
      var confirmPassword = document.getElementById("confirmPassword").value;

      if (password === confirmPassword) {
        Accounts.createUser({email: email.trim(), password: password.trim()}, (error) => {
          if (error) {
            console.log(error);
            this.setState({error: "Error: " + error.reason});
            return false;
          } else {
            console.log("Logged In: " + Meteor.userId());
            return true;
          }
        });
      } else {
        this.setState({error: "Error: Passwords do not match"});
        return false;
      }
    }
  }

    render() {
      return (
        <div className="login-container">
          <form className="login-form" id="login-form" onSubmit={ this._handleSubmit.bind(this) } >
            <p className="form-title selected" onClick={ this._changeForm.bind(this) } value="login">Log In</p>
            <p className="form-title" id="register-button" onClick={ this._changeForm.bind(this) } value="register">Register</p>
            <p className="error-msg">{this.state.error}</p>
            <div className="login-content">
              <input type="email" id="loginEmail" placeholder="Email"/>
              <input type="password" id="loginPassword"  placeholder="Password"/>
              { this.state.form == "register" ? <input type="password" id="confirmPassword"  placeholder="Confirm Password"/> : null }
              <input type="submit" className="button" id="login-button" value="Join Session" />
            </div>
          </form>
        </div>
      );
    }
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      user: this.props.user,
      userId: Meteor.userId()
    };
  }

  render() {
    return (
      <div>
        { !this.state.userId ? <LoginForm /> : null }
      </div>
    )
  }
}
