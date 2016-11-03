import { FlowRouter } from 'meteor/kadira:flow-router';
import { composeWithTracker } from 'react-komposer';
// import { Sessions } from '/lib/collections/sessions';
import SessionVideo from '/client/components/session/session.video.jsx';

const onPropsChange = (props, onData) => {
  var sessionId = FlowRouter.getParam("sessionId");
  const subscription = Meteor.subscribe("sessions", {
    onReady: () => { console.log("Subscription Ready: ", 200, " OK"); },
    onError: () => { console.log("Subscription Error: ", arguments); }
  });
  if (subscription.ready()) {
    const session = Sessions.findOne(sessionId);
    onData(null, {session});
  };
};

export default SessionVideoContainer = composeWithTracker(onPropsChange)(SessionVideo);
