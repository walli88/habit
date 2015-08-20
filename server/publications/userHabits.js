Meteor.publish('UserHabits', function () {
  return UserHabits.find();
})