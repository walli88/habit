Meteor.publish('habits', function () {
	return Habits.find();
})

Meteor.publish('habit', function(id) {
  return Habits.find(id);
});
