Meteor.publish('habits', function () {
	return Habits.find();
})

Meteor.publish('habit', function(id) {
  return Habits.find(id);
});

Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});