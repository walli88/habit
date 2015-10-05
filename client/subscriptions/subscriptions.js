// ***************************************************************
// SUBSCRIPTIONS (not handled with routing)
// ***************************************************************

Meteor.subscribe ("habits", function () {
	return Habits.find();
});

Meteor.subscribe ("UserHabits", function () {
    return UserHabits.find();
});

Meteor.subscribe ("activities", function () {
    return Activities.find();
});


Meteor.subscribe("directory");