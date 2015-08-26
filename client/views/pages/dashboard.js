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
    'change #yes' : function(e,t) {
        e.preventDefault();
        var userHabit = Blaze.getData(e.target);
        // console.log(e.target);
        console.log($(e.target).parent());
        // console.log($(e.currentTarget).closest("showBtn"));

        var lastModify = moment.duration(moment(new Date()).diff(moment(userHabit.lastModified))).asSeconds();
        console.log(lastModify);
        if(lastModify < 2) {
            console.log($(e.currentTarget));
            $(e.currentTarget).attr('checked', false);
            console.log($(e.currentTarget));
            $(e.currentTarget).parent().removeClass("active");
            sAlert.error('You can add at most 3 habits', {offset: '0px', stack: false})
        } else {
            Meteor.call('incUserHabitCount', this._id);
        }
    },
    'change #no' : function(e) {
        var userHabit = Blaze.getData(e.target);
        Meteor.call('decUserHabitCount', this._id);
        var lastModify = moment.duration(moment(new Date()).diff(moment(userHabit.lastModified))).asSeconds();
        console.log(lastModify);
        if(lastModify < 2) {
            $(e.currentTarget).removeClass("active")
            sAlert.error('You can add at most 3 habits', {offset: '0px', stack: false})
        } else {
            Meteor.call('decUserHabitCount', this._id);
        }
    }

});