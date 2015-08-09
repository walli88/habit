Habits = new Meteor.Collection('habits');

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

// Meteor methods related to collection
Meteor.methods ( {
  sendEmail: function( email ) {
      Email.send({to:email, from:'charlesmzhu@gmail.com', subject:'Thank you for signing up for our project', text:'We will share with you some news about us in a near future. See you soon!'});
    }
  });