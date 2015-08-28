UserHabits = new Meteor.Collection('UserHabits');

Meteor.methods({

  saveUserHabits: function ( UserHabitAttributes ) {
  var user = Meteor.user();
  var allHabits = Habits.find({_id: {$in: UserHabitAttributes}}, {fields: {'habit':1,'_id':1}}).fetch();

  //global variable, we can remove after remove need from accounts.js
  savedHabits = UserHabitAttributes;

  allHabits.forEach(function(entry) {
    var userHabitEntry = {userId: user._id, count: 0,habitsId: entry._id, habit: entry.habit, lastModified : new Date, lastYes: false};
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
