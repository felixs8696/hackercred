// import { Sessions } from '/lib/collections/sessions';
import SessionInitObject from '/lib/constants';

Meteor.users.remove({});
Sessions.remove({});
if(_.isEqual(Sessions.find().count(),0)){
  var SessionObj = SessionInitObject;
  SessionObj.createdAt = new Date();
  Sessions.insert(SessionObj);
};
