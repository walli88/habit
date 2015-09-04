Habits = new Meteor.Collection('habits');

Habits.attachSchema(new SimpleSchema({
  userId: {
    type: String,
    autoValue:function(){ return this.userId }
  },
  trait: {
    type: String,
    allowedValues: ["Healthy", "Organized", "Social", "Confident", "Thrifty"]
  },
  habit: {
    type: String
  },
}));

// Allow and deny rules
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

Meteor.methods({
})