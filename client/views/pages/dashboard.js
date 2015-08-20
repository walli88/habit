Template.dashboard.rendered = function() {
};

Template.dashboard.helpers({
    userHabits: function(){
        // return ["Healthy", "Organized", "Social", "Confident", "Thrifty"]; // If this is hardcoded, if there's a new category, it won't appear
        // return UserHabits.find();
        return Habits.find();
    },
});

Template.dashboard.events({
});