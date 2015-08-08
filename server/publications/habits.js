Meteor.publish('habits', function () {
	return Habits.find();
})