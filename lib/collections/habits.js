Habits = new Meteor.Collection('habits');

Habits.attachSchema(new SimpleSchema({
  userId: {
    type: String,
    autoValue:function(){ return this.userId || "0"}
  },
  trait: {
    type: String,
    allowedValues: ["Healthy", "Organized", "Social", "Confident", "Thrifty"]
  },
  habit: {
    type: String
  },
}));

Meteor.methods({
})

Habits.allow({
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