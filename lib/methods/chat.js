import { Sessions } from '/collections/sessions';

export const updateChat = {
  name: 'chat.update',

  run({ sessionId, msg }) {
    console.log(sessionId);
    console.log(msg);
    return Sessions.update(sessionId, {$push: {"chat.messages": msg}});
  },

  call(args, callback) {
    const options = {
      returnStubValue: true,
      throwStubExceptions: true
    }

    Meteor.apply(this.name, [args], options, callback);
  }
};

Meteor.methods({
  [updateChat.name]: function (args) {
    console.log(args);
    return updateChat.run.call(this, args);
  }
})
