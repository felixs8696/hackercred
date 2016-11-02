// import { Sessions } from '/lib/collections/sessions';
import SessionInitObject from '/lib/constants';

// new SimpleSchema({
//   todoId: { type: String },
//   newText: { type: String }
// }).validate({ todoId, newText });

// if (!Sessions.editableBy(this.userId)) {
//   throw new Meteor.Error('sessions.updateSessions.unauthorized',
//     'Cannot edit sessions in a private list that is not yours');
// }

export const updateSessions = {
  name: 'sessions.updateSessions',

  // Factor out validation so that it can be run independently (1)
  // validate(args) {
  //   new SimpleSchema({
  //     todoId: { type: String },
  //     newText: { type: String }
  //   }).validate(args)
  // },

  // Factor out Method body so that it can be called independently (3)
  run() {
    return Sessions.insert(SessionInitObject);
  },

  // Call Method by referencing the JS object (4)
  // Also, this lets us specify Meteor.apply options once in
  // the Method implementation, rather than requiring the caller
  // to specify it at the call site.
  call(args, callback) {
    const options = {
      returnStubValue: true,     // (5)
      throwStubExceptions: true  // (6)
    }

    Meteor.apply(this.name, [args], options, callback);
  }
};

// Actually register the method with Meteor's DDP system
Meteor.methods({
  [updateSessions.name]: (args) => {
    // updateSessions.validate.call(this, args);
    return updateSessions.run.call(this, args);
  }
})
