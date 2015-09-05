Habits = new Meteor.Collection('habits');

//Emails collection for collecting emails, mapped on to user
Emails = new Meteor.Collection('emails');


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