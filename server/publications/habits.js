Meteor.publish('habits', function () {
  return Habits.find({$or:[{userId: this.userId},{userId: "0"}]});
})