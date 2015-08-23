Meteor.publish('UserHabits', function () {
  return UserHabits.find({userId: this.userId});
})