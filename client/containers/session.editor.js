import { composeWithTracker } from 'react-komposer';
// import { Sessions } from '/lib/collections/sessions';
import SessionEditor from '/client/components/session/session.editor.jsx';

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

export default SessionEditorContainer = composeWithTracker(onPropsChange)(SessionEditor);
