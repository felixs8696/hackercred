export const usersContent = {
  name: 'users.getCurrent',

  run() {
    return Meteor.users.findOne(Meteor.userId());
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
    [usersContent.name]: function (args) {
      return usersContent.run.call(this, args);
    }
  })
}
