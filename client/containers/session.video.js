import { composeWithTracker } from 'react-komposer';
import { Sessions } from '/collections/sessions';
import SessionVideo from '/client/components/session/session.video.jsx';

const onPropsChange = (props, onData) => {
  const subscription = Meteor.subscribe("sessions", {
    onReady: () => { console.log("Subscription Ready: ", 200, " OK"); },
    onError: () => { console.log("Subscription Error: ", arguments); }
  });
  if (subscription.ready()) {
    const session = Sessions.find().fetch()[0];
    onData(null, {session});
  };
};

export default SessionVideoContainer = composeWithTracker(onPropsChange)(SessionVideo);
