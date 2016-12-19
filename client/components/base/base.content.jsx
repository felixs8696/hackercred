import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { moment } from 'meteor/momentjs:moment';
import { usersContent } from '/lib/methods/users';
import { getSessionObj } from '/lib/methods/sessions';
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionSearch from 'material-ui/svg-icons/action/search';
import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline';
import SocialSchool from 'material-ui/svg-icons/social/school';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const styles = {
  headline: {
    fontSize: 16,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const sidebarIconStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "28px",
  width: "28px"
}

var image = 'http://fullhdpictures.com/wp-content/uploads/2016/06/Mark-Zuckerberg-HD-Wallpaper.jpg';

var style = {
  background: 'linear-gradient(rgba(0, 0, 0, .25), rgba(0, 0, 0, .25)), url(' + image + ')'
}


export default class BaseContent extends React.Component {
  componentWillMount() {
    var tableRows = [];
    usersContent.call({}, (err, currentUser) => {
      if (err) {
        console.log(err);
        return null;
      } else {
        console.log(currentUser);
        var userSessions = currentUser.profile.sessions;
        if (userSessions) {
          userSessions.map((sessionId) => {
            getSessionObj.call({sessionId: sessionId}, (err, session) => {
              if (err) {
                console.log(err);
                return null;
              } else {
                // console.log(session);
                const subjects = ['CS170', 'CS188'];
                var sessionData = {
                  date: moment(session.createdAt).format('MM.DD.YYYY  @  h:mma'),
                  sessionId: sessionId,
                  subjects: subjects.join(", "),
                  participants: Object.keys(session.users).map((key) => {
                    return session.users[key].profile.firstname + " " + session.users[key].profile.lastname[0] + ".";
                  }).join(", ")
                }
                tableRows.push(sessionData);
              }
            });
          });
        }
      }
    });
    this.setState({tableRows: tableRows});
  }

  constructor(props) {
    super(props)
    this.state = {
      value: 'recent'
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleChange(value) {
    this.setState({...this.state,
      value: value
    });
  };

  _handleClick(rowNum, colNum) {
    const tableRow = document.getElementById('row_'+rowNum);
    const sessionId = tableRow.getAttribute("value");
    if (sessionId) FlowRouter.go("/" + sessionId);
  }

  render() {
    return (
      <div>
        <div className="dash_cover" style={style}></div>
        <div className="dash-content">
          <Tabs value={this.state.value} onChange={this._handleChange}>
            <Tab label="Recent" value="recent">
              <div className="tab-content">
                <h2 style={styles.headline}>Recent Activity</h2>
                <p>
                  Click on sessions below to revisit them.
                </p>
                <Table wrapperStyle={{overflow:'inherit'}} onCellClick={this._handleClick} fixedHeader={true} fixedFooter={false} selectable={false} multiSelectable={false} >
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                    <TableRow>
                      <TableHeaderColumn tooltip="Session Date">Date / Time</TableHeaderColumn>
                      <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Subjects">Subjects</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Participants">Participants</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false} deselectOnClickaway={false} showRowHover={true} stripedRows={false}>
                    {this.state.tableRows.map( (sessionData, index) => (
                      <TableRow key={index} id={"row_" + index} value={sessionData.sessionId}>
                        <TableRowColumn>{sessionData.date}</TableRowColumn>
                        <TableRowColumn>{sessionData.sessionId}</TableRowColumn>
                        <TableRowColumn>{sessionData.subjects}</TableRowColumn>
                        <TableRowColumn>{sessionData.participants}</TableRowColumn>
                      </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}
