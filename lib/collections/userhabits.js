UserHabits = new Meteor.Collection('UserHabits');

UserHabits.attachSchema(new SimpleSchema({
  userId: {
    type: String,
    index: 1
  },
  count: {
    type: Number
  },
  habitsId: {
    type: String
  },
  habit: {
    type: String
  },
  lastModified: {
    type: Date
  },
  lastYes: {
    type: Boolean
  }
}));

Meteor.methods({

  saveUserHabits: function ( UserHabitAttributes ) {
  var user = Meteor.user();
  var allHabits = Habits.find({_id: {$in: UserHabitAttributes}}, {fields: {'habit':1,'_id':1}}).fetch();

  allHabits.forEach(function(entry) {
    var userHabitEntry = {userId: user._id, count: 0 ,habitsId: entry._id, habit: entry.habit, lastModified : new Date, lastYes: false};
    UserHabits.insert(userHabitEntry)
    });
  },

  incUserHabitCount : function (userHabitId) {
    UserHabits.update(
      {_id: userHabitId},
      {$inc: {count: 1}, $set: {lastModified: new Date(),lastYes: true}}
    );
  },

  decUserHabitCount : function (userHabitId) {
    UserHabits.update(
      {_id: userHabitId},
      {$inc: {count: -1}, $set: {lastModified: new Date(),lastYes: false}}
    );
  },

  deleteUserHabit : function (HabitId) {
    UserHabits.remove(
      {$and: [{habitsId: HabitId}, {userId: Meteor.userId}]}
    );
  },

  sendConfirmationEmail : function ( ) {
    
    var text = "Thanks for signing up for The Gratitude Journal! I'm really excited about this and I'll be following up here and there to get some of your feedback. "
    + "Email me at anytime at charlesmzhu@gmail.com with feedback or questions! \n\n"
    + "Here's your first gratitude entry:\n\n" 
    + Meteor.user().profile.grats[0].grat
    + "\n\nStay tuned for reminder emails from this account.";

    Email.send ({
      to: Meteor.user().emails[0].address,
      from: "The Gratitude Journal <postmaster@sandbox430629e9d36648f893dc50345e9b3c42.mailgun.org>",
      subject: "Thanks for signing up for The Gratitude Journal",
      text: text
    });
  }
})
