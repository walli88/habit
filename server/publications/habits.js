Meteor.publish('habits', function () {
  return Habits.find();
})

Meteor.publish('habit', function(id) {
  return Habits.find(id);
});


//For temporarily being able to access all users from client. Get rid of this in production.
Meteor.publish("directory", function () {
  return Meteor.users.find();
});