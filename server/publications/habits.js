Meteor.publish('habits', function () {
    // return Habits.find();
  return Habits.find({$or:[{userId: this.userId},{userId: "0"}]});
})


//For temporarily being able to access all users from client. Get rid of this in production.
Meteor.publish("directory", function () {
  return Meteor.users.find();
});