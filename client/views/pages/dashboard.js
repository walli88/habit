Template.dashboard.rendered = function() {
};

Template.dashboard.helpers({
    userHabits: function(){
        return UserHabits.find();
    },
});

Template.dashboard.events({
});