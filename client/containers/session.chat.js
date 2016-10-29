import { composeWithTracker } from 'react-komposer';
import { Sessions } from '/collections/sessions';
import SessionChat from '/client/components/session/session.chat.jsx';

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

export default SessionChatContainer = composeWithTracker(onPropsChange)(SessionChat);
