UserHabits = new Meteor.Collection('UserHabits');

Meteor.methods({
  saveUserHabits: function ( UserHabitAttributes ) {
  var user = Meteor.user();

  var allHabits = Habits.find({_id: {$in: UserHabitAttributes}}, {fields: {'habit':1,'_id':1}}).fetch();

  console.log(allHabits)


  allHabits.forEach(function(entry) {
    var userHabitEntry = {userId: user._id, count: 0,habitsId: entry._id, habit: entry.habit, lastModified : new Date, lastYes: false};
    UserHabits.insert(userHabitEntry)
    });
  },

  incUserHabitCount : function (userHabitId) {
    UserHabits.update(
      {_id: userHabitId},
      {$inc: {count: 1}, $currentDate: {lastModified:true}}
        // {$inc: {count: 1}, $currentDate: {lastModified:true}, $set: {lastYes: true}}
    );
  },

  decUserHabitCount : function (userHabitId) {
    UserHabits.update(
      {_id: userHabitId},
      {$inc : {count: -1}, $currentDate: {lastModified:true}}
      // {$inc : {count: -1}, $currentDate: {lastModified:true}, $set: {lastYes: false}}
    );
  }



})