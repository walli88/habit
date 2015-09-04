UserHabits = new Meteor.Collection('UserHabits');

UserHabits.attachSchema(new SimpleSchema({
  userId: {
    type: String,
    index: 1
  },
  count: {
    type: Number
  },
  habitsId: {
    type: String
  },
  habit: {
    type: String
  },
  lastModified: {
    type: Date
  },
  lastYes: {
    type: Boolean
  }
}));

Meteor.methods({

  saveUserHabits: function ( UserHabitAttributes ) {
  var user = Meteor.user();
  var allHabits = Habits.find({_id: {$in: UserHabitAttributes}}, {fields: {'habit':1,'_id':1}}).fetch();

  allHabits.forEach(function(entry) {
    var userHabitEntry = {userId: user._id, count: 0 ,habitsId: entry._id, habit: entry.habit, lastModified : new Date, lastYes: false};
    UserHabits.insert(userHabitEntry)
    });
  },

  incUserHabitCount : function (userHabitId) {
    UserHabits.update(
      {_id: userHabitId},
      {$inc: {count: 1}, $set: {lastModified: new Date(),lastYes: true}}
    );
  },

  decUserHabitCount : function (userHabitId) {
    UserHabits.update(
      {_id: userHabitId},
      {$inc: {count: -1}, $set: {lastModified: new Date(),lastYes: false}}
    );
  }
})
