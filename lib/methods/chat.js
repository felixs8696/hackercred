// import { Sessions } from '/lib/collections/sessions';

export const updateChat = {
  name: 'chat.update',

  run({ sessionId, msg }) {
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

export const connectUserSession = {
  name: 'session.addUser',

  run({ sessionId, userId, userObj }) {
    const newUser = "users." + userId;
    var obj = {};
    obj[newUser] = userObj;
    Sessions.update(sessionId, {$set: obj});
    Meteor.users.update(userId, {$push: {'profile.sessions': sessionId}});
    return Sessions.findOne(sessionId).users;
  },

  call(args, callback) {
    const options = {
      returnStubValue: true,
      throwStubExceptions: true
    }

    Meteor.apply(this.name, [args], options, callback);
  }
};

export const userInSession = {
  name: 'session.userInSession',

  run({ sessionId, userId }) {
    if (!Sessions.findOne(sessionId)) return null;
    return Sessions.findOne(sessionId)['users'][userId];
  },

  call(args, callback) {
    const options = {
      returnStubValue: true,
      throwStubExceptions: true
    }

    Meteor.apply(this.name, [args], options, callback);
  }
};

if (Meteor.isServer) {
  Meteor.methods({
    [updateChat.name]: function (args) {
      return updateChat.run.call(this, args);
    },
    [connectUserSession.name]: function (args) {
      return connectUserSession.run.call(this, args);
    },
    [userInSession.name]: function (args) {
      return userInSession.run.call(this, args);
    }
  })
}
