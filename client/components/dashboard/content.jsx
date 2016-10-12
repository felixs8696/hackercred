import React from 'react';

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

export default Content = () => (
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
      <div className="dash_tabs">

      </div>
    </div>
  </div>
);
