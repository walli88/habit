// ***************************************************************
// SUBSCRIPTIONS (not handled with routing)
// ***************************************************************

Meteor.subscribe ("habits", function () {
	return Habits.find();
});

Meteor.subscribe ("UserHabits", function () {
    return UserHabits.find();
});


Meteor.subscribe("directory");