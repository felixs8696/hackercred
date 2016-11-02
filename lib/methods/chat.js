// import { Sessions } from '/lib/collections/sessions';

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

export const addUserToSession = {
  name: 'session.addUser',

  run({ sessionId, userId, userObj }) {
    const newUser = "users." + userId;
    var obj = {};
    obj[newUser] = userObj;
    var updated = Sessions.update(sessionId, {$set: obj});
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
    // console.log(Sessions.findOne(sessionId)['users'].userId);
    return Sessions.findOne(sessionId)['users'].userId;
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
    [addUserToSession.name]: function (args) {
      return addUserToSession.run.call(this, args);
    },
    [userInSession.name]: function (args) {
      return userInSession.run.call(this, args);
    }
  })
}