import React from 'react';

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.login}
      </div>
    )
  }
}
