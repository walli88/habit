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