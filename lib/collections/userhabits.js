UserHabits = new Meteor.Collection('UserHabits');

Meteor.methods({
  saveUserHabits: function ( UserHabitAttributes ) {
  var user = Meteor.user();

  var allHabits = Habits.find({_id: {$in: UserHabitAttributes}}, {fields: {'habit':1,'_id':0}}).fetch();

  console.log(allHabits)

  allHabits.forEach(function(entry) {
    var userHabitEntry = _.extend(entry, {userId: user._id, count: 1})
    UserHabits.insert(userHabitEntry)
    });
  }

})