import { Sessions } from '/collections/sessions';
import SessionInitObject from '/lib/constants';

Meteor.users.remove({});
Sessions.remove({});
if(_.isEqual(Sessions.find().count(),0)){
  Sessions.insert(SessionInitObject);
};
