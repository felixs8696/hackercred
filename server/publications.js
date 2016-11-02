// import { Sessions } from '/lib/collections/sessions';

Meteor.publish("sessions", () =>{
  return Sessions.find();
});
