Template.dashboard.rendered = function() {
};

Template.dashboard.helpers({
    userHabits: function(){
        return UserHabits.find();
    },
});

/*
TOOD
1. clicking on yes and no increments the count
2. count can only be incremented once ever hour
*/

Template.dashboard.events({
    'change #yes' : function(e) {
        var userHabit = Blaze.getData(e.target);
        Meteor.call('incUserHabitCount', this._id);
    },
    'change #no' : function(e) {
        var userHabit = Blaze.getData(e.target);
        Meteor.call('decUserHabitCount', this._id);
    }

});