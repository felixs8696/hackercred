import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 16,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

var image = 'http://fullhdpictures.com/wp-content/uploads/2016/06/Mark-Zuckerberg-HD-Wallpaper.jpg';

var style = {
  background: 'linear-gradient(rgba(0, 0, 0, .25), rgba(0, 0, 0, .25)), url(' + image + ')'
}

var user = {
  name: 'Mark Zuckerberg',
  school: 'University of California, Berkeley',
  degree: 'B.A.',
  major: 'Computer Science',
  skills: ['Algorithms', 'Data Structures', 'Security', 'Software Engineering', 'Artificial Intelligence', 'Dynamic Programming', 'Web Design', 'Operating Systems', 'Internet Architecture'],
  followers: 1039,
  points: 1024497
}

var skillChips = user.skills.map(function(skill) {
  return ( <div key={skill} className="skill-chip"> {skill} </div> );
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default class Content extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 'a'
    };
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(value) {
    this.setState({...this.state,
      value: value
    });
  };

  render() {
    return (
      <div>
        <div className="dash_cover" style={style}>
          <div className="cover-content">
            <div className="cover-summary">
              <div className="personal-info">
                <div className="personal-name">
                  {user.name}
                </div>
                <div>{user.school}</div>
                <div>{user.degree + ' ' + user.major}</div>
              </div>
              <div className="skill-chips">
                {skillChips}
              </div>
            </div>
            <div className="stats-container">
              <div className="followers">
                {user.followers}
              </div>
              <div className="hacker-points accent-font">
                {numberWithCommas(user.points)}
              </div>
            </div>
          </div>
        </div>
        <div className="dash_content">
          <div className="dash_sidebar">

          </div>
          <Tabs value={this.state.value} onChange={this._handleChange}>
            <Tab label="Tab A" value="a" >
              <div>
                <h2 style={styles.headline}>Controllable Tab A</h2>
                <p>
                  Tabs are also controllable if you want to programmatically pass them their values.
                  This allows for more functionality in Tabs such as not
                  having any Tab selected or assigning them different values.
                </p>
              </div>
            </Tab>
            <Tab label="Tab B" value="b">
              <div>
                <h2 style={styles.headline}>Controllable Tab B</h2>
                <p>
                  This is another example of a controllable tab. Remember, if you
                  use controllable Tabs, you need to give all of your tabs values or else
                  you wont be able to select them.
                </p>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}
