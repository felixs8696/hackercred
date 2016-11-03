import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';

function enterSite(sessionId) {
  if (!sessionId || sessionId.length == 0) {
    FlowRouter.go("/");
  } else {
    FlowRouter.go("/" + sessionId);
  }
}

class LoginForm extends React.Component {
  componentWillMount() {
    this.setState({id: FlowRouter.getParam('sessionId')});
  }

  constructor(props) {
    super(props);

    this.state = {
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
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    if (this.state.form == "login") {
      if ((email && email.length > 0) && (password && password.length > 0)) {
        Meteor.loginWithPassword(email.trim(), password.trim(), (error) => {
          if (error) {
            console.log(error);
            this.setState({error: "Error: " + error.reason});
            return false;
          } else {
            const userId = Meteor.userId();
            console.log("Logged In: " + userId);
            this.props.updateMeteorId(userId);
            enterSite(this.state.id);
            return true;
          }
        });
      } else {
        this.setState({error: "Error: Empty email or password"});
        return false;
      }
    }

    if (this.state.form == "register") {
      var confirmPassword = document.getElementById("confirmPassword").value;
      var first = document.getElementById("firstName").value;
      var last = document.getElementById("lastName").value;
      var imageUrl = document.getElementById("imageUrl").value;
      var userObj = { firstname: first, lastname: last, image: imageUrl };

      if (password === confirmPassword) {
        Accounts.createUser({email: email.trim(), password: password.trim(), profile: userObj}, (error) => {
          if (error) {
            console.log(error);
            this.setState({error: "Error: " + error.reason});
            return false;
          } else {
            const userId = Meteor.userId();
            console.log("Logged In: " + userId);
            this.props.updateMeteorId(userId);
            enterSite(this.state.id);
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
            { this.state.form == "register" ? <input type="text" id="firstName" placeholder="First Name"/> : null }
            { this.state.form == "register" ? <input type="text" id="lastName" placeholder="Last Name"/> : null }
            { this.state.form == "register" ? <input type="text" id="imageUrl" placeholder="Image URL"/> : null }
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

    this.state = {
      user: this.props.user,
      userId: Meteor.userId()
    };
  }

  updateMeteorId(id) {
    this.setState({ userId: id });
  }

  render() {
    return (
      <div>
        { !this.state.userId ? <LoginForm updateMeteorId={ this.updateMeteorId.bind(this) } /> : null }
      </div>
    )
  }
}
