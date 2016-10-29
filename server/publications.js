import { Sessions } from '/collections/sessions';

Meteor.publish("sessions", () =>{
  return Sessions.find();
});
