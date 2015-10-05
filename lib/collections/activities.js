Activities = new Meteor.Collection('activities');

Activities.attachSchema(new SimpleSchema({
  userId: {
    type: String,
    autoValue:function(){ return this.userId || "0"}
  },
  activity: {
    type: String,
    label: "Activity:",
    max: 120,
    optional: false
  },
  hour: {
    type: Number,
    label: "Hours:",
    max: 24,
    optional: true
  },
  perweek: {
    type: Number,
    label: "Per Week:",
    max: 24,
    optional: true
  }
}));

Meteor.methods({

  getTotal : function (userHabitId) {
    Activities.find({_id: userHabitId}).fetch();
  },
})

Activities.allow({
  insert: function (userId, doc) {
    // Free-for-all!
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // Free-for-all!
    return true;
  },
  remove: function (userId, doc) {
    // Free-for-all!
    return true;
  }
});